'use client';
import Link from 'next/link';

const applications = [
  { company: 'Tokopedia', logo: 'TO', role: 'Frontend Developer Intern', status: 'interview', date: '10 Apr 2025' },
  { company: 'Gojek', logo: 'GO', role: 'Product Management Intern', status: 'reviewed', date: '8 Apr 2025' },
  { company: 'Ruangguru', logo: 'RG', role: 'UI/UX Design Intern', status: 'pending', date: '5 Apr 2025' },
  { company: 'Traveloka', logo: 'TR', role: 'Data Analyst Intern', status: 'accepted', date: '1 Apr 2025' },
];

const statusLabel: Record<string, string> = { pending: 'Menunggu', reviewed: 'Ditinjau', interview: 'Interview', accepted: 'Diterima', rejected: 'Ditolak' };

const recommended = [
  { company: 'Shopee', logo: 'SH', role: 'Frontend Intern', match: 95, location: 'Jakarta' },
  { company: 'Dana', logo: 'DA', role: 'Mobile Dev Intern', match: 88, location: 'Remote' },
  { company: 'OVO', logo: 'OV', role: 'Backend Intern', match: 82, location: 'Jakarta' },
];

export default function DashboardPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: 'var(--bg-card)', borderRight: '1px solid var(--border)', padding: '24px 0', position: 'sticky', top: 0, height: '100vh', flexShrink: 0 }}>
        <div style={{ padding: '0 20px 24px', borderBottom: '1px solid var(--border)', marginBottom: 16 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 14, color: '#0a0f1e' }}>IC</div>
            <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 17, color: 'var(--text)' }}>InternContact</span>
          </Link>
        </div>
        {[
          { href: '/dashboard', icon: '🏠', label: 'Dashboard', active: true },
          { href: '/jobs', icon: '🔍', label: 'Cari Magang', active: false },
          { href: '/dashboard', icon: '📊', label: 'Lamaran Saya', active: false },
          { href: '/cv-builder', icon: '📄', label: 'CV Builder', active: false },
          { href: '/interview-sim', icon: '🎤', label: 'Simulasi Interview', active: false },
          { href: '/portfolio', icon: '🗂️', label: 'Portofolio', active: false },
          { href: '/companies', icon: '⭐', label: 'Review Perusahaan', active: false },
        ].map(item => (
          <Link key={item.label} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', textDecoration: 'none', background: item.active ? 'rgba(0,229,160,0.08)' : 'transparent', borderRight: item.active ? '2px solid var(--accent)' : '2px solid transparent', color: item.active ? 'var(--accent)' : 'var(--text-muted)', fontSize: 14, fontFamily: 'DM Sans,sans-serif', transition: 'all 0.2s' }}>
            <span>{item.icon}</span> {item.label}
          </Link>
        ))}
        <div style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid var(--border)', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 14, color: '#0a0f1e' }}>AK</div>
            <div>
              <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 600, fontSize: 13 }}>Ahmad Khoirul</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Teknik Informatika • UI</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: 36 }}>
            <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 28, marginBottom: 4 }}>Selamat Datang, Ahmad! 👋</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>Pantau progress magang dan rekomendasi terbaru untukmu.</p>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 36 }}>
            {[
              { icon: '📨', label: 'Total Lamaran', val: '4', color: 'var(--accent)' },
              { icon: '🎤', label: 'Interview', val: '1', color: '#a855f7' },
              { icon: '✅', label: 'Diterima', val: '1', color: 'var(--accent)' },
              { icon: '🤖', label: 'AI Match Avg', val: '87%', color: 'var(--accent2)' },
            ].map((s, i) => (
              <div key={i} className="card" style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: 28, fontFamily: 'Syne,sans-serif', fontWeight: 800, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
            {/* Applications */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 20 }}>Lamaran Aktif</h2>
                <Link href="/jobs" style={{ color: 'var(--accent)', fontSize: 13, textDecoration: 'none' }}>Lihat semua →</Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {applications.map((app, i) => (
                  <div key={i} className="card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 14, color: '#0a0f1e', flexShrink: 0 }}>{app.logo}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Syne,sans-serif', fontSize: 15, fontWeight: 600 }}>{app.role}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{app.company} · {app.date}</div>
                    </div>
                    <span className={`status-${app.status}`} style={{ borderRadius: 999, fontSize: 12, fontWeight: 600, padding: '4px 12px' }}>{statusLabel[app.status]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar widgets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* AI Recommendations */}
              <div className="card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: 18 }}>🤖</span>
                  <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 16 }}>Rekomendasi AI</h3>
                </div>
                {recommended.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < recommended.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-card2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 12, color: 'var(--accent)', flexShrink: 0 }}>{r.logo}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{r.role}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.company} · {r.location}</div>
                    </div>
                    <span style={{ background: 'rgba(0,229,160,0.15)', color: 'var(--accent)', borderRadius: 999, fontSize: 11, fontWeight: 700, padding: '2px 8px' }}>{r.match}%</span>
                  </div>
                ))}
                <Link href="/jobs" className="btn-secondary" style={{ display: 'block', textAlign: 'center', padding: '10px', borderRadius: 10, fontSize: 13, textDecoration: 'none', marginTop: 14 }}>Lihat Semua →</Link>
              </div>

              {/* Quick Actions */}
              <div className="card" style={{ padding: '20px' }}>
                <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 16, marginBottom: 14 }}>Aksi Cepat</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { href: '/cv-builder', icon: '📄', label: 'Buat CV Baru' },
                    { href: '/interview-sim', icon: '🎤', label: 'Latihan Interview' },
                    { href: '/portfolio', icon: '🗂️', label: 'Update Portofolio' },
                  ].map(a => (
                    <Link key={a.label} href={a.href} className="btn-secondary" style={{ padding: '11px 14px', borderRadius: 10, fontSize: 13, textDecoration: 'none', justifyContent: 'flex-start' }}>
                      {a.icon} {a.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
