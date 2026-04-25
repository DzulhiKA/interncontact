"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

type Portfolio = {
  id: string
  title: string
  type: "project" | "certificate" | "achievement"
  description: string
  tags: string[]
  created_at: string
}

type UserProfile = {
  full_name: string
  university: string
  major: string
  skills: string[]
}

const typeConfig: Record<
  string,
  { label: string; color: string; icon: string }
> = {
  project: { label: "Proyek", color: "var(--accent)", icon: "🛠️" },
  certificate: { label: "Sertifikat", color: "var(--accent2)", icon: "🏆" },
  achievement: { label: "Pencapaian", color: "var(--accent3)", icon: "⭐" },
}

export default function PortfolioPage() {
  const router = useRouter()
  const [filter, setFilter] = useState("all")
  const [showModal, setShowModal] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [newItem, setNewItem] = useState({
    title: "",
    type: "project",
    description: "",
    tags: "",
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) {
        router.push("/auth")
        return
      }

      setUserId(session.user.id)

      // Ambil profil user
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single()

      setProfile({
        full_name:
          profileData?.full_name ||
          session.user.user_metadata?.full_name ||
          "Pengguna",
        university: profileData?.university || "",
        major: profileData?.major || "",
        skills: profileData?.skills || [],
      })

      // Ambil portofolio user
      const { data: portfolioData } = await supabase
        .from("portfolios")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })

      setPortfolios(portfolioData || [])
      setLoading(false)
    }
    getData()
  }, [router])

  const handleAddItem = async () => {
    if (!newItem.title || !userId) return
    setSaving(true)

    const { data, error } = await supabase
      .from("portfolios")
      .insert({
        user_id: userId,
        title: newItem.title,
        type: newItem.type,
        description: newItem.description,
        tags: newItem.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      })
      .select()
      .single()

    if (!error && data) {
      setPortfolios((prev) => [data, ...prev])
      setNewItem({ title: "", type: "project", description: "", tags: "" })
      setShowModal(false)
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    await supabase.from("portfolios").delete().eq("id", id)
    setPortfolios((prev) => prev.filter((p) => p.id !== id))
  }

  const filtered =
    filter === "all" ? portfolios : portfolios.filter((p) => p.type === filter)

  const initials =
    profile?.full_name
      ?.split(" ")
      .map((n: string) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U"

  if (loading) {
    return (
      <div
        style={{
          background: "var(--bg)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>⏳</div>
          <p style={{ color: "var(--text-muted)" }}>Memuat portofolio...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <nav
        style={{
          background: "rgba(10,15,30,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
          padding: "0 5%",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 72,
          }}
        >
          <Link
            href="/dashboard"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "var(--gradient)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Syne,sans-serif",
                fontWeight: 800,
                fontSize: 16,
                color: "#0a0f1e",
              }}
            >
              IC
            </div>
            <span
              style={{
                fontFamily: "Syne,sans-serif",
                fontWeight: 700,
                fontSize: 20,
                color: "var(--text)",
              }}
            >
              Portofolio Digital
            </span>
          </Link>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className="btn-secondary"
              style={{ padding: "9px 18px", borderRadius: 10, fontSize: 14 }}
            >
              🔗 Bagikan Link
            </button>
            <button
              className="btn-primary"
              onClick={() => setShowModal(true)}
              style={{ padding: "9px 18px", borderRadius: 10, fontSize: 14 }}
            >
              + Tambah Item
            </button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 5%" }}>
        {/* Profile header — data dari Supabase */}
        <div
          className="card"
          style={{
            padding: "32px",
            marginBottom: 36,
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "var(--gradient)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Syne,sans-serif",
              fontWeight: 800,
              fontSize: 28,
              color: "#0a0f1e",
              flexShrink: 0,
            }}
          >
            {initials}
          </div>
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontFamily: "Syne,sans-serif",
                fontSize: 24,
                marginBottom: 4,
              }}
            >
              {profile?.full_name}
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 15,
                marginBottom: 12,
              }}
            >
              {profile?.major}
              {profile?.major && profile?.university ? " · " : ""}
              {profile?.university}
            </p>
            {profile?.skills && profile.skills.length > 0 && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {profile.skills.map((s) => (
                  <span key={s} className="tag" style={{ fontSize: 12 }}>
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 24,
              textAlign: "center",
            }}
          >
            {[
              { val: portfolios.length, label: "Item" },
              {
                val: portfolios.filter((p) => p.type === "project").length,
                label: "Proyek",
              },
            ].map((s, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: "Syne,sans-serif",
                    fontWeight: 800,
                    fontSize: 26,
                    color: "var(--accent)",
                  }}
                >
                  {s.val}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter */}
        <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
          {[
            ["all", "Semua"],
            ["project", "🛠️ Proyek"],
            ["certificate", "🏆 Sertifikat"],
            ["achievement", "⭐ Pencapaian"],
          ].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              style={{
                padding: "9px 18px",
                borderRadius: 10,
                border:
                  filter === val
                    ? "1px solid var(--accent)"
                    : "1px solid var(--border)",
                background:
                  filter === val ? "rgba(0,229,160,0.1)" : "transparent",
                color: filter === val ? "var(--accent)" : "var(--text-muted)",
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "DM Sans,sans-serif",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {filtered.map((item) => {
            const config = typeConfig[item.type]
            const dateStr = new Date(item.created_at).toLocaleDateString(
              "id-ID",
              { month: "short", year: "numeric" },
            )
            return (
              <div key={item.id} className="card" style={{ padding: "24px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <span style={{ fontSize: 28 }}>{config.icon}</span>
                  <span
                    style={{
                      fontSize: 12,
                      color: config.color,
                      background: `rgba(0,0,0,0.2)`,
                      border: `1px solid ${config.color}33`,
                      borderRadius: 999,
                      padding: "3px 10px",
                      fontWeight: 600,
                    }}
                  >
                    {config.label}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "Syne,sans-serif",
                    fontSize: 17,
                    marginBottom: 8,
                  }}
                >
                  {item.title}
                </h3>
                {item.description && (
                  <p
                    style={{
                      color: "var(--text-muted)",
                      fontSize: 13,
                      lineHeight: 1.6,
                      marginBottom: 14,
                    }}
                  >
                    {item.description}
                  </p>
                )}
                {item.tags?.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      flexWrap: "wrap",
                      marginBottom: 14,
                    }}
                  >
                    {item.tags.map((t) => (
                      <span key={t} className="tag" style={{ fontSize: 11 }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    📅 {dateStr}
                  </span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      color: "#ef4444",
                      borderRadius: 8,
                      padding: "6px 10px",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            )
          })}

          {/* Add card */}
          <div
            onClick={() => setShowModal(true)}
            style={{
              border: "2px dashed var(--border)",
              borderRadius: 16,
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              cursor: "pointer",
              minHeight: 200,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "var(--accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--border)")
            }
          >
            <div style={{ fontSize: 32, color: "var(--text-muted)" }}>+</div>
            <div
              style={{
                color: "var(--text-muted)",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              Tambah Proyek,
              <br />
              Sertifikat, atau Pencapaian
            </div>
          </div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && !showModal && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "var(--text-muted)",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>🗂️</div>
            <p style={{ fontSize: 16, marginBottom: 8 }}>
              Belum ada item portofolio
            </p>
            <p style={{ fontSize: 14 }}>
              Klik "+ Tambah Item" untuk mulai menambahkan proyek atau
              sertifikatmu
            </p>
          </div>
        )}
      </div>

      {/* Modal tambah item */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
            padding: 20,
          }}
        >
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 20,
              padding: 36,
              width: "100%",
              maxWidth: 500,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <h3 style={{ fontFamily: "Syne,sans-serif", fontSize: 22 }}>
                Tambah Item Portofolio
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  fontSize: 20,
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 500,
                    marginBottom: 6,
                  }}
                >
                  Judul *
                </label>
                <input
                  className="input-field"
                  placeholder="Nama proyek atau sertifikat..."
                  value={newItem.title}
                  onChange={(e) =>
                    setNewItem({ ...newItem, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 500,
                    marginBottom: 6,
                  }}
                >
                  Tipe
                </label>
                <select
                  className="input-field"
                  value={newItem.type}
                  onChange={(e) =>
                    setNewItem({ ...newItem, type: e.target.value })
                  }
                >
                  <option value="project">🛠️ Proyek</option>
                  <option value="certificate">🏆 Sertifikat</option>
                  <option value="achievement">⭐ Pencapaian</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 500,
                    marginBottom: 6,
                  }}
                >
                  Deskripsi
                </label>
                <textarea
                  className="input-field"
                  rows={3}
                  placeholder="Deskripsikan proyek atau sertifikatmu..."
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                  style={{ resize: "vertical" }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 500,
                    marginBottom: 6,
                  }}
                >
                  Tags (pisah koma)
                </label>
                <input
                  className="input-field"
                  placeholder="React, TypeScript, Figma..."
                  value={newItem.tags}
                  onChange={(e) =>
                    setNewItem({ ...newItem, tags: e.target.value })
                  }
                />
              </div>
              <button
                className="btn-primary"
                onClick={handleAddItem}
                disabled={saving || !newItem.title}
                style={{
                  padding: "13px",
                  borderRadius: 10,
                  fontSize: 15,
                  justifyContent: "center",
                }}
              >
                {saving ? "⏳ Menyimpan..." : "+ Tambahkan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
