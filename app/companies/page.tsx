'use client';
import { useState } from 'react';
import Link from 'next/link';

const companies = [
  { id: '1', name: 'Tokopedia', logo: 'TO', industry: 'E-Commerce', location: 'Jakarta', rating: 4.7, reviews: 128, tags: ['Work-Life Balance', 'Mentor Aktif', 'Proyek Nyata'], verified: true },
  { id: '2', name: 'Gojek', logo: 'GO', industry: 'Technology', location: 'Jakarta', rating: 4.5, reviews: 203, tags: ['Inovatif', 'Tim Solid', 'Fasilitas Lengkap'], verified: true },
  { id: '3', name: 'Ruangguru', logo: 'RG', industry: 'EdTech', location: 'Jakarta', rating: 4.8, reviews: 89, tags: ['Fleksibel', 'Belajar Banyak', 'Remote-Friendly'], verified: true },
  { id: '4', name: 'Traveloka', logo: 'TR', industry: 'Travel Tech', location: 'Jakarta', rating: 4.3, reviews: 67, tags: ['Internasional', 'Data-Driven', 'Agile'], verified: true },
  { id: '5', name: 'Bukalapak', logo: 'BL', industry: 'E-Commerce', location: 'Bandung', rating: 4.1, reviews: 54, tags: ['UMKM Focus', 'Tim Ramah', 'Inovatif'], verified: true },
];

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: 'var(--accent3)', fontSize: 14 }}>
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
    </span>
  );
}

export default function CompaniesPage() {
  const [search, setSearch] = useState('');
  const filtered = companies.filter(c => (c.name + c.industry).toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{ background: 'rgba(10,15,30,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '0 5%', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 16, color: '#0a0f1e' }}>IC</div>
            <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 20, color: 'var(--text)' }}>InternContact</span>
          </Link>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link href="/jobs" className="btn-secondary" style={{ padding: '9px 20px', borderRadius: 10, fontSize: 14, textDecoration: 'none' }}>Lowongan</Link>
            <Link href="/auth" className="btn-primary" style={{ padding: '9px 20px', borderRadius: 10, fontSize: 14, textDecoration: 'none' }}>Masuk</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 5%' }}>
        <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 36, marginBottom: 8 }}>Review Perusahaan ⭐</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Baca pengalaman mahasiswa lain sebelum melamar</p>

        <div style={{ position: 'relative', marginBottom: 32, maxWidth: 480 }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
          <input className="input-field" placeholder="Cari perusahaan..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 44 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {filtered.map(c => (
            <div key={c.id} className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 16, color: '#0a0f1e', flexShrink: 0 }}>{c.logo}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 18 }}>{c.name}</h3>
                    {c.verified && <span style={{ fontSize: 14 }}>✅</span>}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{c.industry} · {c.location}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <Stars rating={c.rating} />
                <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 16 }}>{c.rating}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>({c.reviews} ulasan)</span>
              </div>

              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
                {c.tags.map(t => <span key={t} className="tag" style={{ fontSize: 11 }}>{t}</span>)}
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <Link href="/auth" className="btn-primary" style={{ flex: 1, padding: '10px', borderRadius: 10, fontSize: 13, textDecoration: 'none', justifyContent: 'center' }}>Lihat Review</Link>
                <Link href="/auth" className="btn-secondary" style={{ flex: 1, padding: '10px', borderRadius: 10, fontSize: 13, textDecoration: 'none', justifyContent: 'center' }}>Tulis Review</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
