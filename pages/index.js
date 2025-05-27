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
    <div style={{ padding: 20, backgroundColor: '#000', color: '#fff', minHeight: '100vh', textAlign: 'center' }}>
      <h1>AI MTK by Alecia Md</h1>
      <input
        style={{ padding: '0.5rem', width: '80%', marginTop: 20 }}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Masukkan soal MTK (contoh: 1x1)"
      />
      <br />
      <button onClick={solve} style={{ marginTop: 10, padding: '0.5rem 1rem' }}>Selesaikan</button>
      <div style={{ marginTop: 20 }}>{result}</div>
      {alert && <div style={{ color: 'red', marginTop: 10 }}>{alert}</div>}
      <img src="https://i.ibb.co/0CysFmn/teacher-anime.png" alt="teacher anime" style={{ marginTop: 30, width: 150 }} />
    </div>
  );
          }
