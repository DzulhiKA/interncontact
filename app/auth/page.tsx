"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState<"login" | "register">("register")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    email: "",
    password: "",
    full_name: "",
    university: "",
    major: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (mode === "register") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: {
              full_name: form.full_name,
              university: form.university,
              major: form.major,
            },
          },
        })

        if (signUpError) throw signUpError

        if (data.user) {
          await supabase.from("profiles").upsert({
            id: data.user.id,
            email: form.email,
            full_name: form.full_name,
            university: form.university,
            major: form.major,
          })
        }

        router.push("/dashboard")
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        })

        if (signInError) throw signInError

        router.push("/dashboard")
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan"
      if (msg.includes("Invalid login credentials")) {
        setError("Email atau password salah. Coba lagi.")
      } else if (msg.includes("User already registered")) {
        setError("Email sudah terdaftar. Silakan login.")
      } else if (msg.includes("Password should be")) {
        setError("Password minimal 6 karakter.")
      } else {
        setError(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "10%",
          left: "5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,229,160,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "10%",
          right: "5%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "var(--gradient)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Syne,sans-serif",
                fontWeight: 800,
                fontSize: 18,
                color: "#0a0f1e",
              }}
            >
              IC
            </div>
            <span
              style={{
                fontFamily: "Syne,sans-serif",
                fontWeight: 700,
                fontSize: 22,
                color: "var(--text)",
              }}
            >
              InternContact
            </span>
          </Link>
          <h1
            style={{
              fontFamily: "Syne,sans-serif",
              fontSize: 28,
              fontWeight: 700,
              marginTop: 24,
              marginBottom: 8,
            }}
          >
            {mode === "register"
              ? "Mulai Perjalananmu 🚀"
              : "Selamat Datang Kembali 👋"}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 15 }}>
            {mode === "register"
              ? "Daftar gratis dan temukan magang impianmu"
              : "Masuk ke akun InternContact-mu"}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: 4,
            marginBottom: 32,
          }}
        >
          {(["register", "login"] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m)
                setError("")
              }}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: 9,
                border: "none",
                fontFamily: "Syne,sans-serif",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
                background: mode === m ? "var(--gradient)" : "transparent",
                color: mode === m ? "#0a0f1e" : "var(--text-muted)",
                transition: "all 0.2s",
              }}
            >
              {m === "register" ? "Daftar" : "Masuk"}
            </button>
          ))}
        </div>

        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 10,
              padding: "12px 16px",
              marginBottom: 20,
              color: "#ef4444",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <div className="card" style={{ padding: 32 }}>
          <form onSubmit={handleSubmit}>
            {mode === "register" && (
              <>
                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 500,
                      marginBottom: 8,
                    }}
                  >
                    Nama Lengkap
                  </label>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Nama lengkapmu"
                    value={form.full_name}
                    onChange={(e) =>
                      setForm({ ...form, full_name: e.target.value })
                    }
                    required
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 14,
                        fontWeight: 500,
                        marginBottom: 8,
                      }}
                    >
                      Universitas
                    </label>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="Nama universitas"
                      value={form.university}
                      onChange={(e) =>
                        setForm({ ...form, university: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 14,
                        fontWeight: 500,
                        marginBottom: 8,
                      }}
                    >
                      Jurusan
                    </label>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="Jurusanmu"
                      value={form.major}
                      onChange={(e) =>
                        setForm({ ...form, major: e.target.value })
                      }
                    />
                  </div>
                </div>
              </>
            )}
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 500,
                  marginBottom: 8,
                }}
              >
                Email
              </label>
              <input
                className="input-field"
                type="email"
                placeholder="email@universitas.ac.id"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 500,
                  marginBottom: 8,
                }}
              >
                Password
              </label>
              <input
                className="input-field"
                type="password"
                placeholder="Min. 6 karakter"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 10,
                fontSize: 16,
                justifyContent: "center",
              }}
              disabled={loading}
            >
              {loading
                ? "⏳ Memproses..."
                : mode === "register"
                  ? "🚀 Daftar Gratis"
                  : "→ Masuk"}
            </button>
          </form>

          {mode === "register" && (
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 13,
                textAlign: "center",
                marginTop: 20,
                lineHeight: 1.6,
              }}
            >
              Dengan mendaftar, kamu menyetujui{" "}
              <Link
                href="#"
                style={{ color: "var(--accent)", textDecoration: "none" }}
              >
                Syarat & Ketentuan
              </Link>{" "}
              dan{" "}
              <Link
                href="#"
                style={{ color: "var(--accent)", textDecoration: "none" }}
              >
                Kebijakan Privasi
              </Link>{" "}
              kami.
            </p>
          )}
        </div>

        {mode === "register" && (
          <div
            style={{
              marginTop: 24,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
            }}
          >
            {["✅ Gratis Selamanya", "🤖 AI Matching", "🔔 Notif Otomatis"].map(
              (b, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(0,229,160,0.05)",
                    border: "1px solid rgba(0,229,160,0.1)",
                    borderRadius: 10,
                    padding: "12px 8px",
                    textAlign: "center",
                    fontSize: 13,
                    color: "var(--text-muted)",
                  }}
                >
                  {b}
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  )
}
