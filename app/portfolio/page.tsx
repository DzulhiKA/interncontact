'use client';
import { useState } from 'react';
import Link from 'next/link';

const mockPortfolio = [
  { id: '1', title: 'E-Commerce Dashboard UI', type: 'project', tags: ['React', 'Figma', 'UI/UX'], desc: 'Dashboard admin untuk platform e-commerce dengan dark mode dan analitik real-time.', date: 'Mar 2025' },
  { id: '2', title: 'Sertifikat Google UX Design', type: 'certificate', tags: ['UX Design', 'Google', 'Coursera'], desc: 'Kursus intensif 6 bulan tentang desain pengalaman pengguna dari Google.', date: 'Jan 2025' },
  { id: '3', title: 'Juara 2 Hackathon Nasional', type: 'achievement', tags: ['Hackathon', 'Kompetisi', 'Tim'], desc: 'Meraih juara 2 dari 200+ tim dalam kompetisi hackathon teknologi nasional.', date: 'Des 2024' },
  { id: '4', title: 'REST API Backend Node.js', type: 'project', tags: ['Node.js', 'Express', 'PostgreSQL'], desc: 'API backend skala produksi dengan autentikasi JWT dan dokumentasi Swagger.', date: 'Nov 2024' },
];

const typeConfig: Record<string, { label: string; color: string; icon: string }> = {
  project: { label: 'Proyek', color: 'var(--accent)', icon: '🛠️' },
  certificate: { label: 'Sertifikat', color: 'var(--accent2)', icon: '🏆' },
  achievement: { label: 'Pencapaian', color: 'var(--accent3)', icon: '⭐' },
};

export default function PortfolioPage() {
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);

  const filtered = filter === 'all' ? mockPortfolio : mockPortfolio.filter(p => p.type === filter);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{ background: 'rgba(10,15,30,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '0 5%', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <Link href="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 16, color: '#0a0f1e' }}>IC</div>
            <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 20, color: 'var(--text)' }}>Portofolio Digital</span>
          </Link>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-secondary" style={{ padding: '9px 18px', borderRadius: 10, fontSize: 14 }}>🔗 Bagikan Link</button>
            <button className="btn-primary" onClick={() => setShowModal(true)} style={{ padding: '9px 18px', borderRadius: 10, fontSize: 14 }}>+ Tambah Item</button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 5%' }}>
        {/* Profile header */}
        <div className="card" style={{ padding: '32px', marginBottom: 36, display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 28, color: '#0a0f1e', flexShrink: 0 }}>AK</div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 24, marginBottom: 4 }}>Ahmad Khoirul</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 12 }}>Teknik Informatika · Universitas Indonesia · Semester 6</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['React', 'TypeScript', 'Node.js', 'UI/UX', 'Python'].map(s => (
                <span key={s} className="tag" style={{ fontSize: 12 }}>{s}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, textAlign: 'center' }}>
            {[{ val: mockPortfolio.length, label: 'Item' }, { val: '2K+', label: 'Dilihat' }, { val: '4.8', label: 'Rating' }].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 22, color: 'var(--accent)' }}>{s.val}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
          {[['all', 'Semua'], ['project', '🛠️ Proyek'], ['certificate', '🏆 Sertifikat'], ['achievement', '⭐ Pencapaian']].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)} style={{ padding: '9px 18px', borderRadius: 10, border: filter === val ? '1px solid var(--accent)' : '1px solid var(--border)', background: filter === val ? 'rgba(0,229,160,0.1)' : 'transparent', color: filter === val ? 'var(--accent)' : 'var(--text-muted)', fontFamily: 'DM Sans,sans-serif', fontSize: 14, cursor: 'pointer', transition: 'all 0.2s' }}>
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {filtered.map(item => {
            const config = typeConfig[item.type];
            return (
              <div key={item.id} className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>{config.icon}</span>
                  <span style={{ fontSize: 12, color: config.color, background: `rgba(${item.type === 'project' ? '0,229,160' : item.type === 'certificate' ? '14,165,233' : '245,158,11'},0.1)`, border: `1px solid rgba(${item.type === 'project' ? '0,229,160' : item.type === 'certificate' ? '14,165,233' : '245,158,11'},0.2)`, borderRadius: 999, padding: '3px 10px', fontWeight: 600 }}>{config.label}</span>
                </div>
                <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 17, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                  {item.tags.map(t => <span key={t} className="tag" style={{ fontSize: 11 }}>{t}</span>)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>📅 {item.date}</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-secondary" style={{ padding: '6px 12px', borderRadius: 8, fontSize: 12 }}>✏️</button>
                    <button className="btn-secondary" style={{ padding: '6px 12px', borderRadius: 8, fontSize: 12 }}>🔗</button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add card */}
          <div onClick={() => setShowModal(true)} style={{ border: '2px dashed var(--border)', borderRadius: 16, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, cursor: 'pointer', minHeight: 200, transition: 'all 0.2s' }} onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
            <div style={{ fontSize: 32, color: 'var(--text-muted)' }}>+</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 14, textAlign: 'center' }}>Tambah Proyek,<br />Sertifikat, atau Pencapaian</div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 20 }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 36, width: '100%', maxWidth: 500 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 22 }}>Tambah Item Portofolio</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 20 }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Judul</label>
                <input className="input-field" placeholder="Nama proyek atau sertifikat..." />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Tipe</label>
                <select className="input-field">
                  <option>Proyek</option>
                  <option>Sertifikat</option>
                  <option>Pencapaian</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Deskripsi</label>
                <textarea className="input-field" rows={3} placeholder="Deskripsikan proyek atau sertifikatmu..." style={{ resize: 'vertical' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Tags (pisah koma)</label>
                <input className="input-field" placeholder="React, TypeScript, Figma..." />
              </div>
              <button className="btn-primary" style={{ padding: '13px', borderRadius: 10, fontSize: 15, justifyContent: 'center' }}>+ Tambahkan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
