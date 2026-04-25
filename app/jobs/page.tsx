'use client';
import { useState } from 'react';
import Link from 'next/link';

const mockJobs = [
  { id: '1', title: 'Frontend Developer Intern', company: 'Tokopedia', logo: 'TO', location: 'Jakarta (Hybrid)', salary: 'Rp 3-5 juta/bulan', deadline: '30 Mei 2025', tags: ['React', 'TypeScript', 'Tailwind'], match: 98, type: 'Hybrid' },
  { id: '2', title: 'Product Management Intern', company: 'Gojek', logo: 'GO', location: 'Jakarta (Onsite)', salary: 'Rp 4-6 juta/bulan', deadline: '15 Jun 2025', tags: ['Product', 'Agile', 'Data Analysis'], match: 91, type: 'Onsite' },
  { id: '3', title: 'UI/UX Design Intern', company: 'Ruangguru', logo: 'RG', location: 'Remote', salary: 'Rp 2-4 juta/bulan', deadline: '20 Jun 2025', tags: ['Figma', 'Design System', 'Prototyping'], match: 87, type: 'Remote' },
  { id: '4', title: 'Data Analyst Intern', company: 'Traveloka', logo: 'TR', location: 'Jakarta (Onsite)', salary: 'Rp 3-5 juta/bulan', deadline: '25 Jun 2025', tags: ['Python', 'SQL', 'Tableau'], match: 84, type: 'Onsite' },
  { id: '5', title: 'Backend Engineer Intern', company: 'Bukalapak', logo: 'BL', location: 'Bandung (Hybrid)', salary: 'Rp 3-4 juta/bulan', deadline: '10 Jul 2025', tags: ['Node.js', 'PostgreSQL', 'Docker'], match: 79, type: 'Hybrid' },
  { id: '6', title: 'Marketing Intern', company: 'Shopee', logo: 'SH', location: 'Jakarta (Onsite)', salary: 'Rp 2-3 juta/bulan', deadline: '5 Jul 2025', tags: ['Digital Marketing', 'SEO', 'Content'], match: 73, type: 'Onsite' },
];

export default function JobsPage() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('Semua');
  const [aiMode, setAiMode] = useState(true);

  const filtered = mockJobs.filter(j =>
    (j.title + j.company + j.tags.join()).toLowerCase().includes(search.toLowerCase()) &&
    (selectedType === 'Semua' || j.type === selectedType)
  );
  const sorted = aiMode ? [...filtered].sort((a, b) => b.match - a.match) : filtered;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{ background: 'rgba(10,15,30,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '0 5%', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 16, color: '#0a0f1e' }}>IC</div>
            <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 20, color: 'var(--text)' }}>InternContact</span>
          </Link>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link href="/dashboard" className="btn-secondary" style={{ padding: '9px 20px', borderRadius: 10, fontSize: 14, textDecoration: 'none' }}>Dashboard</Link>
            <Link href="/auth" className="btn-primary" style={{ padding: '9px 20px', borderRadius: 10, fontSize: 14, textDecoration: 'none' }}>Masuk</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 5%' }}>
        <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 36, marginBottom: 8 }}>Temukan Lowongan Magang 🔍</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>{sorted.length} lowongan tersedia</p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 260, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
            <input className="input-field" placeholder="Cari posisi, skill, atau perusahaan..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 44 }} />
          </div>
          <select className="input-field" value={selectedType} onChange={e => setSelectedType(e.target.value)} style={{ width: 160 }}>
            {['Semua', 'Remote', 'Hybrid', 'Onsite'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, padding: '14px 20px', background: 'rgba(0,229,160,0.05)', border: '1px solid rgba(0,229,160,0.15)', borderRadius: 12 }}>
          <span style={{ fontSize: 20 }}>🤖</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 600, fontSize: 15 }}>AI Matching Mode</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Urut berdasarkan kecocokan profilmu</div>
          </div>
          <button onClick={() => setAiMode(!aiMode)} style={{ width: 52, height: 28, borderRadius: 14, background: aiMode ? 'var(--accent)' : 'var(--border-bright)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: aiMode ? 26 : 4, transition: 'left 0.2s' }} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {sorted.map(job => (
            <div key={job.id} className="card" style={{ padding: '22px 26px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 16, color: '#0a0f1e', flexShrink: 0 }}>{job.logo}</div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 17 }}>{job.title}</h3>
                  {aiMode && <span style={{ background: 'rgba(0,229,160,0.15)', color: 'var(--accent)', border: '1px solid rgba(0,229,160,0.3)', borderRadius: 999, fontSize: 11, fontWeight: 700, padding: '2px 10px' }}>{job.match}% Match</span>}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 8 }}>{job.company} · {job.location} · {job.salary}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {job.tags.map(t => <span key={t} className="tag" style={{ fontSize: 11 }}>{t}</span>)}
                  <span className="tag tag-blue" style={{ fontSize: 11 }}>{job.type}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>⏰ {job.deadline}</div>
                <Link href="/auth" className="btn-primary" style={{ padding: '10px 18px', borderRadius: 10, fontSize: 13, textDecoration: 'none' }}>Lamar →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
