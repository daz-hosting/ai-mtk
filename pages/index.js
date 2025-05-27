import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [alert, setAlert] = useState('');

  const solve = async () => {
    setAlert('');
    setResult('Menghitung...');
    if (!input.trim()) {
      setAlert('Masukkan soal terlebih dahulu!');
      setResult('');
      return;
    }
    try {
      const res = await fetch('/api/solve?q=' + encodeURIComponent(input));
      const data = await res.json();
      if (data.status) {
        setResult('Hasil: ' + data.data.answer);
      } else {
        setAlert('Gagal mendapatkan jawaban');
        setResult('');
      }
    } catch (e) {
      setAlert('Terjadi kesalahan: ' + e.message);
      setResult('');
    }
  };

  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>AI MTK by Alecia</title>
      </head>
      <main style={{
        padding: 20,
        background: 'linear-gradient(to bottom, #0f0f0f, #1a1a1a)',
        color: '#f5f5f5',
        minHeight: '100vh',
        fontFamily: 'Segoe UI, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Halo! Aku Alecia Tutor AI</h1>
        <p style={{ marginBottom: '1rem' }}>Yuk, masukkan soal MTK yang ingin kamu selesaikan:</p>
        <input
          style={{
            padding: '0.5rem',
            width: '80%',
            maxWidth: '400px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Contoh: 1x1"
        />
        <button
          onClick={solve}
          style={{
            marginTop: 15,
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#00bcd4',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0, 188, 212, 0.3)'
          }}
        >
          Selesaikan
        </button>
        <div style={{ marginTop: 20, fontSize: '1.1rem' }}>{result}</div>
        {alert && <div style={{ color: 'red', marginTop: 10 }}>{alert}</div>}
        <img src="https://i.ibb.co/0CysFmn/teacher-anime.png" alt="Anime teacher"
          style={{ marginTop: 30, width: 180, borderRadius: '12px' }} />
        <p style={{ marginTop: 10, fontStyle: 'italic', color: '#aaa' }}>
          Aku siap bantu kamu kapan pun!
        </p>
      </main>
    </>
  );
          }
          
