import axios from 'axios';

export default async function handler(req, res) {
  const { q } = req.query;
  if (!q) return res.status(400).json({ status: false, message: 'Query kosong' });

  try {
    const response = await axios.get(
      `https://api.alyachan.dev/api/ai-mathsolver?q=${encodeURIComponent(q)}&apikey=slimextzy`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ status: false, message: 'Gagal memproses permintaan' });
  }
}
