'use client';
import { useState } from 'react';
import Link from 'next/link';

const questions = [
  'Ceritakan tentang dirimu dan mengapa kamu tertarik magang di bidang ini?',
  'Apa kelebihan dan kekuranganmu yang relevan dengan posisi ini?',
  'Ceritakan pengalaman kerja tim atau proyek yang pernah kamu lakukan.',
  'Bagaimana kamu menangani tekanan dan deadline yang ketat?',
  'Di mana kamu melihat dirimu 5 tahun ke depan?',
  'Mengapa kamu memilih perusahaan kami untuk magang?',
  'Apa proyek atau pencapaian yang paling kamu banggakan?',
  'Bagaimana kamu belajar hal-hal baru dengan cepat?',
];

const feedbackExamples = [
  { icon: '✅', text: 'Jawaban terstruktur dengan baik menggunakan metode STAR' },
  { icon: '✅', text: 'Menunjukkan antusiasme dan motivasi yang kuat' },
  { icon: '⚠️', text: 'Berikan contoh yang lebih spesifik dan terukur' },
  { icon: '💡', text: 'Coba sebutkan skill teknis yang relevan dengan posisi' },
];

export default function InterviewSimPage() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleSubmit = () => {
    setAnswers(prev => [...prev, answer]);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1);
      setAnswer('');
      setSubmitted(false);
    }
  };

  if (!started) {
    return (
      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <nav style={{ background: 'rgba(10,15,30,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '0 5%' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
            <Link href="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 16, color: '#0a0f1e' }}>IC</div>
              <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 20, color: 'var(--text)' }}>Simulasi Interview</span>
            </Link>
          </div>
        </nav>
        <div style={{ maxWidth: 700, margin: '80px auto', padding: '0 5%', textAlign: 'center' }}>
          <div style={{ fontSize: 72, marginBottom: 24 }}>🎤</div>
          <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 36, marginBottom: 16 }}>Simulasi Interview AI</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>
            Latihan wawancara dengan pertanyaan-pertanyaan yang sering ditanyakan HRD. AI akan memberikan feedback langsung untuk setiap jawabanmu.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
            {[
              { icon: '📋', title: `${questions.length} Pertanyaan`, desc: 'Pertanyaan umum HR & user' },
              { icon: '🤖', title: 'AI Feedback', desc: 'Analisis jawaban real-time' },
              { icon: '📈', title: 'Skor & Tips', desc: 'Tingkatkan kemampuanmu' },
            ].map((f, i) => (
              <div key={i} className="card" style={{ padding: '20px' }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
                <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 600, marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{f.desc}</div>
              </div>
            ))}
          </div>
          <button className="btn-primary" onClick={() => setStarted(true)} style={{ padding: '16px 48px', borderRadius: 12, fontSize: 17 }}>
            🚀 Mulai Simulasi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{ background: 'rgba(10,15,30,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '0 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 18, color: 'var(--text)' }}>🎤 Simulasi Interview</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>Pertanyaan {currentQ + 1} / {questions.length}</span>
            <div style={{ width: 140, height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${((currentQ + 1) / questions.length) * 100}%`, height: '100%', background: 'var(--gradient)', transition: 'width 0.3s' }} />
            </div>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 800, margin: '60px auto', padding: '0 5%' }}>
        {/* Question */}
        <div className="card" style={{ padding: '32px', marginBottom: 24, borderColor: 'rgba(0,229,160,0.2)' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🤖</div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pertanyaan Interviewer</div>
              <p style={{ fontSize: 18, lineHeight: 1.7, fontFamily: 'Syne,sans-serif' }}>{questions[currentQ]}</p>
            </div>
          </div>
        </div>

        {/* Answer */}
        {!submitted ? (
          <div>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 10 }}>Jawaban Kamu:</label>
            <textarea className="input-field" value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Ketik jawabanmu di sini... Gunakan metode STAR (Situation, Task, Action, Result) untuk jawaban yang lebih terstruktur." rows={7} style={{ resize: 'vertical', marginBottom: 16 }} />
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-primary" onClick={handleSubmit} style={{ padding: '13px 28px', borderRadius: 10, fontSize: 15 }} disabled={!answer.trim()}>
                ✅ Kirim Jawaban
              </button>
              <button className="btn-secondary" onClick={handleNext} style={{ padding: '13px 28px', borderRadius: 10, fontSize: 15 }}>
                Lewati →
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* AI Feedback */}
            <div className="card" style={{ padding: '24px', marginBottom: 20, borderColor: 'rgba(0,229,160,0.2)' }}>
              <div style={{ display: 'flex', align: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 20 }}>🤖</span>
                <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 18 }}>Feedback AI</h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, padding: '16px', background: 'rgba(0,229,160,0.05)', borderRadius: 10 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 32, fontFamily: 'Syne,sans-serif', fontWeight: 800, color: 'var(--accent)' }}>78</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Skor</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden', marginBottom: 6 }}>
                    <div style={{ width: '78%', height: '100%', background: 'var(--gradient)' }} />
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Jawaban cukup baik — ada beberapa area yang bisa ditingkatkan</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {feedbackExamples.map((fb, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--text-muted)' }}>
                    <span style={{ flexShrink: 0 }}>{fb.icon}</span>
                    <span>{fb.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="btn-primary" onClick={handleNext} style={{ padding: '13px 28px', borderRadius: 10, fontSize: 15 }} disabled={currentQ >= questions.length - 1}>
              {currentQ < questions.length - 1 ? 'Pertanyaan Berikutnya →' : '🏁 Selesai!'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
