'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const features = [
  { icon: '🤖', title: 'Rekomendasi Magang AI', desc: 'Lowongan otomatis disesuaikan dengan jurusan & skill-mu menggunakan teknologi AI terdepan.', tag: 'AI-Powered', tagClass: '' },
  { icon: '📄', title: 'CV Builder', desc: 'Buat CV profesional khusus magang langsung dari aplikasi dengan template yang sudah teruji.', tag: 'Template Pro', tagClass: 'tag-blue' },
  { icon: '📊', title: 'Tracking Lamaran', desc: 'Pantau status setiap lamaranmu dari awal hingga diterima — semua di satu dashboard.', tag: 'Real-time', tagClass: '' },
  { icon: '🎤', title: 'Simulasi Interview', desc: 'Latihan wawancara berbasis AI sebelum hari H. Dapatkan feedback langsung.', tag: 'AI Coach', tagClass: 'tag-blue' },
  { icon: '🗂️', title: 'Portofolio Digital', desc: 'Simpan & bagikan hasil kerja dan sertifikat magangmu dalam satu halaman portofolio elegan.', tag: 'Shareable', tagClass: '' },
  { icon: '⭐', title: 'Review Perusahaan', desc: 'Baca pengalaman jujur mahasiswa lain sebelum melamar. Pilih perusahaan yang tepat.', tag: 'Community', tagClass: 'tag-blue' },
];

const stats = [
  { num: '50K+', label: 'Mahasiswa Aktif' },
  { num: '2K+', label: 'Perusahaan Partner' },
  { num: '95%', label: 'Tingkat Kepuasan' },
  { num: '12K+', label: 'Magang Berhasil' },
];

const testimonials = [
  { name: 'Rina Sari', uni: 'Universitas Indonesia — Teknik Informatika', text: 'InternContact mengubah cara aku cari magang. AI-nya nemu perusahaan yang beneran cocok sama skill React-ku. Dalam 2 minggu langsung dapat interview!', avatar: 'RS', company: 'Diterima di Tokopedia' },
  { name: 'Budi Pratama', uni: 'ITB — Manajemen Bisnis', text: 'Fitur simulasi interview-nya luar biasa. Aku latihan 3 kali sebelum interview asli dan akhirnya confident banget. CV Builder-nya juga keren, terlihat profesional.', avatar: 'BP', company: 'Diterima di Gojek' },
  { name: 'Siti Nuraini', uni: 'UGM — Desain Komunikasi Visual', text: 'Portofolio digitalku jadi jauh lebih rapi. Perusahaan-perusahaan langsung tertarik pas lihat halaman portofolio-ku yang dibuat di InternContact.', avatar: 'SN', company: 'Diterima di Ruangguru' },
];

const companies = ['Tokopedia', 'Gojek', 'Traveloka', 'Ruangguru', 'Bukalapak', 'Shopee', 'OVO', 'Dana', 'Grab', 'Tiket.com'];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial(prev => (prev + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? 'rgba(10,15,30,0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid var(--border)' : 'none', transition: 'all 0.3s', padding: '0 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 16, color: '#0a0f1e' }}>IC</div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20 }}>InternContact</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/jobs" style={{ color: 'var(--text-muted)', textDecoration: 'none', padding: '8px 16px', fontSize: 15 }}>Lowongan</Link>
            <Link href="/companies" style={{ color: 'var(--text-muted)', textDecoration: 'none', padding: '8px 16px', fontSize: 15 }}>Perusahaan</Link>
            <Link href="/auth" style={{ color: 'var(--text-muted)', textDecoration: 'none', padding: '8px 16px', fontSize: 15 }}>Masuk</Link>
            <Link href="/auth" className="btn-primary" style={{ padding: '10px 22px', borderRadius: 10, fontSize: 15, textDecoration: 'none' }}>Daftar Gratis →</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: 160, paddingBottom: 120, padding: '160px 5% 120px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '15%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.2)', borderRadius: 999, padding: '6px 16px', marginBottom: 32, fontSize: 14, color: 'var(--accent)' }}>
            ✨ Platform magang #1 untuk mahasiswa Indonesia
          </div>
          <h1 style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontFamily: 'Syne, sans-serif', fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>
            Cari Magang Lebih Mudah,<br />
            <span style={{ background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Karir Dimulai dari Sini!</span>
          </h1>
          <p style={{ fontSize: 20, color: 'var(--text-muted)', marginBottom: 48, maxWidth: 640, margin: '0 auto 48px', lineHeight: 1.7 }}>
            Dengan InternContact, mahasiswa bisa menemukan lowongan magang yang sesuai jurusan dan skill hanya dalam beberapa klik. Biarkan AI yang mencarikan magang terbaik untukmu!
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth" className="btn-primary" style={{ padding: '16px 32px', borderRadius: 12, fontSize: 17, textDecoration: 'none' }}>🚀 Mulai Gratis Sekarang</Link>
            <Link href="/jobs" className="btn-secondary" style={{ padding: '16px 32px', borderRadius: 12, fontSize: 17, textDecoration: 'none' }}>Lihat Lowongan →</Link>
          </div>
          <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 700, margin: '80px auto 0' }}>
            {[
              { emoji: '🤖', title: 'AI Match Score', val: '98%', sub: 'Cocok untuk kamu' },
              { emoji: '📊', title: 'Lamaran Aktif', val: '4', sub: 'Menunggu review' },
              { emoji: '🎤', title: 'Interview Sim', val: 'Siap!', sub: 'Latih sekarang' },
            ].map((card, i) => (
              <div key={i} className="card animate-float" style={{ padding: '20px 16px', animationDelay: `${i * 0.8}s`, textAlign: 'left' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{card.emoji}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{card.title}</div>
                <div style={{ fontSize: 24, fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--accent)', margin: '4px 0' }}>{card.val}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{card.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '60px 5%', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 42, fontFamily: 'Syne, sans-serif', fontWeight: 800, background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.num}</div>
              <div style={{ fontSize: 15, color: 'var(--text-muted)', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '100px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="tag" style={{ marginBottom: 20 }}>Fitur Unggulan</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: 16 }}>Semua yang Kamu Butuhkan<br />untuk Sukses Magang</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 17, maxWidth: 540, margin: '0 auto' }}>Dari cari lowongan sampai diterima — InternContact menemanimu di setiap langkah.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} className="card" style={{ padding: 32 }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{f.icon}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <h3 style={{ fontSize: 20, fontFamily: 'Syne, sans-serif' }}>{f.title}</h3>
                  <span className={`tag ${f.tagClass}`} style={{ fontSize: 11 }}>{f.tag}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: 15 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '100px 5%', background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="tag tag-blue" style={{ marginBottom: 20 }}>Cara Kerja</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>3 Langkah Menuju Magang Impian</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
            {[
              { num: '01', title: 'Daftar & Lengkapi Profil', desc: 'Isi jurusan, skill, dan preferensi magangmu. Semakin lengkap, semakin akurat rekomendasi AI-nya.' },
              { num: '02', title: 'AI Carikan Magang Terbaik', desc: 'Algoritma kami menganalisis ribuan lowongan dan menyajikan yang paling cocok untukmu secara real-time.' },
              { num: '03', title: 'Lamar & Pantau Progress', desc: 'Kirim lamaran, latihan interview, dan pantau semua status dari satu dashboard yang intuitif.' },
            ].map((step, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, color: '#0a0f1e' }}>{step.num}</div>
                <h3 style={{ fontSize: 20, fontFamily: 'Syne, sans-serif', marginBottom: 12 }}>{step.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: 15 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '100px 5%' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="tag" style={{ marginBottom: 20 }}>Testimoni</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>Mahasiswa Berhasil Bersama Kami</h2>
          </div>
          <div className="card" style={{ padding: 48, textAlign: 'center', position: 'relative' }}>
            <div style={{ fontSize: 60, color: 'rgba(0,229,160,0.2)', fontFamily: 'Georgia, serif', position: 'absolute', top: 24, left: 32, lineHeight: 1 }}>"</div>
            <p style={{ fontSize: 18, lineHeight: 1.8, marginBottom: 32, fontStyle: 'italic' }}>{testimonials[activeTestimonial].text}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, color: '#0a0f1e' }}>{testimonials[activeTestimonial].avatar}</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 16 }}>{testimonials[activeTestimonial].name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{testimonials[activeTestimonial].uni}</div>
                <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500 }}>{testimonials[activeTestimonial].company}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 32 }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i === activeTestimonial ? 32 : 8, height: 8, borderRadius: 4, background: i === activeTestimonial ? 'var(--accent)' : 'var(--border-bright)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company logos */}
      <section style={{ padding: '60px 5%', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 32, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Partner Perusahaan Terpercaya</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {companies.map((c, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 20px', fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 14, color: 'var(--text-muted)' }}>{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 5%' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 24, padding: '64px 48px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,160,0.1) 0%, transparent 70%)' }} />
            <div style={{ position: 'absolute', bottom: -40, left: -40, width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎓</div>
              <h2 style={{ fontSize: 36, fontFamily: 'Syne, sans-serif', marginBottom: 16 }}>Siap Mulai Perjalanan Karir-mu?</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 17, marginBottom: 40, lineHeight: 1.7 }}>Gratis untuk semua mahasiswa. Tidak perlu kartu kredit. Mulai cari magang impianmu sekarang!</p>
              <Link href="/auth" className="btn-primary" style={{ padding: '16px 36px', borderRadius: 12, fontSize: 17, textDecoration: 'none' }}>🚀 Daftar Sekarang — Gratis!</Link>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 20 }}>✅ Gratis selamanya &nbsp;·&nbsp; ✅ Tanpa kartu kredit &nbsp;·&nbsp; ✅ Semua jurusan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '48px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 14, color: '#0a0f1e' }}>IC</div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18 }}>InternContact</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Cari Magang Lebih Mudah, Karir Dimulai dari Sini!</p>
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            {['Lowongan', 'Perusahaan', 'CV Builder', 'Blog', 'Tentang Kami'].map(link => (
              <Link key={link} href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 14 }}>{link}</Link>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: '24px auto 0', borderTop: '1px solid var(--border)', paddingTop: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
          © 2025 InternContact. Made with ❤️ for mahasiswa Indonesia.
        </div>
      </footer>
    </div>
  );
}
