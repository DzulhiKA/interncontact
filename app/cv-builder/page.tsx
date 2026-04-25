'use client';
import { useState } from 'react';
import Link from 'next/link';

const templates = [
  { id: 'modern', name: 'Modern', desc: 'Bersih & profesional', color: '#00e5a0' },
  { id: 'minimal', name: 'Minimal', desc: 'Simpel & elegan', color: '#0ea5e9' },
  { id: 'bold', name: 'Bold', desc: 'Berani & kreatif', color: '#f59e0b' },
];

export default function CVBuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [form, setForm] = useState({ name: '', email: '', phone: '', university: '', major: '', gpa: '', skills: '', experience: '', objective: '' });

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{ background: 'rgba(10,15,30,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '0 5%', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <Link href="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 16, color: '#0a0f1e' }}>IC</div>
            <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 20, color: 'var(--text)' }}>CV Builder</span>
          </Link>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-secondary" style={{ padding: '9px 20px', borderRadius: 10, fontSize: 14 }}>💾 Simpan Draft</button>
            <button className="btn-primary" style={{ padding: '9px 20px', borderRadius: 10, fontSize: 14 }}>⬇️ Download PDF</button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '40px 5%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        {/* Form Side */}
        <div>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 22, marginBottom: 24 }}>Isi Data CV-mu 📝</h2>

          {/* Template picker */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pilih Template</label>
            <div style={{ display: 'flex', gap: 12 }}>
              {templates.map(t => (
                <button key={t.id} onClick={() => setSelectedTemplate(t.id)} style={{ flex: 1, padding: '14px 10px', borderRadius: 12, border: selectedTemplate === t.id ? `2px solid ${t.color}` : '2px solid var(--border)', background: selectedTemplate === t.id ? `rgba(${t.id === 'modern' ? '0,229,160' : t.id === 'minimal' ? '14,165,233' : '245,158,11'},0.08)` : 'var(--bg-card)', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }}>
                  <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 15, color: selectedTemplate === t.id ? t.color : 'var(--text)' }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Nama Lengkap</label>
                <input className="input-field" placeholder="Ahmad Khoirul..." value={form.name} onChange={e => update('name', e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Email</label>
                <input className="input-field" placeholder="ahmad@email.com" value={form.email} onChange={e => update('email', e.target.value)} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>No. Telepon</label>
                <input className="input-field" placeholder="+62 812..." value={form.phone} onChange={e => update('phone', e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>IPK</label>
                <input className="input-field" placeholder="3.85 / 4.00" value={form.gpa} onChange={e => update('gpa', e.target.value)} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Universitas</label>
                <input className="input-field" placeholder="Universitas Indonesia" value={form.university} onChange={e => update('university', e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Jurusan</label>
                <input className="input-field" placeholder="Teknik Informatika" value={form.major} onChange={e => update('major', e.target.value)} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Skills (pisahkan dengan koma)</label>
              <input className="input-field" placeholder="React, TypeScript, Node.js, Figma..." value={form.skills} onChange={e => update('skills', e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Objektif / Summary</label>
              <textarea className="input-field" placeholder="Mahasiswa Teknik Informatika semester 6 yang bersemangat..." value={form.objective} onChange={e => update('objective', e.target.value)} rows={3} style={{ resize: 'vertical' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Pengalaman / Kegiatan</label>
              <textarea className="input-field" placeholder="• Ketua UKM Robotika 2024&#10;• Web Developer freelance..." value={form.experience} onChange={e => update('experience', e.target.value)} rows={4} style={{ resize: 'vertical' }} />
            </div>
          </div>
        </div>

        {/* Preview Side */}
        <div style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 22, marginBottom: 24 }}>Preview CV 👀</h2>
          <div style={{ background: 'white', borderRadius: 16, padding: '32px', minHeight: 500, color: '#1a1a2e', fontFamily: 'DM Sans,sans-serif', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
            {/* CV Header */}
            <div style={{ borderBottom: `3px solid ${selectedTemplate === 'modern' ? '#00e5a0' : selectedTemplate === 'minimal' ? '#0ea5e9' : '#f59e0b'}`, paddingBottom: 20, marginBottom: 20 }}>
              <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 26, color: '#0a0f1e', marginBottom: 4 }}>{form.name || 'Nama Lengkapmu'}</h1>
              <div style={{ color: '#555', fontSize: 13 }}>{form.email || 'email@example.com'} {form.phone ? `· ${form.phone}` : ''}</div>
              <div style={{ color: '#555', fontSize: 13 }}>{form.university || 'Universitasmu'} {form.major ? `· ${form.major}` : ''} {form.gpa ? `· IPK ${form.gpa}` : ''}</div>
            </div>
            {form.objective && (
              <div style={{ marginBottom: 18 }}>
                <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: selectedTemplate === 'modern' ? '#00e5a0' : selectedTemplate === 'minimal' ? '#0ea5e9' : '#f59e0b', marginBottom: 8 }}>Objektif</h3>
                <p style={{ fontSize: 13, color: '#333', lineHeight: 1.6 }}>{form.objective}</p>
              </div>
            )}
            {form.skills && (
              <div style={{ marginBottom: 18 }}>
                <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: selectedTemplate === 'modern' ? '#00e5a0' : selectedTemplate === 'minimal' ? '#0ea5e9' : '#f59e0b', marginBottom: 8 }}>Skills</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {form.skills.split(',').map(s => s.trim()).filter(Boolean).map(s => (
                    <span key={s} style={{ background: '#f0f0f0', borderRadius: 6, padding: '3px 10px', fontSize: 12, color: '#333' }}>{s}</span>
                  ))}
                </div>
              </div>
            )}
            {form.experience && (
              <div>
                <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: selectedTemplate === 'modern' ? '#00e5a0' : selectedTemplate === 'minimal' ? '#0ea5e9' : '#f59e0b', marginBottom: 8 }}>Pengalaman</h3>
                <pre style={{ fontSize: 13, color: '#333', lineHeight: 1.7, fontFamily: 'DM Sans,sans-serif', whiteSpace: 'pre-wrap' }}>{form.experience}</pre>
              </div>
            )}
            {!form.name && !form.objective && (
              <div style={{ textAlign: 'center', color: '#aaa', fontSize: 14, paddingTop: 40 }}>Isi form di kiri untuk melihat preview CV-mu ✨</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
