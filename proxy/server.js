const express = require('express');
const fetch = require('node-fetch'); // v2
const cors = require('cors'); // ← NEW
const app = express();

app.use(express.json());



app.use(cors({
  origin: 'https://tenderbloomcarework.com', // your live domain
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// 🔗 Replace with your actual Apps Script web app URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyEnYCYA9HmKWWQA5s5WYCnbKDIqW6EUXERQ5b3Hr87_AUy5PldU05XxJSlCpncApRt/exec';

// This route receives form submissions from your website
app.post('/subscribe', async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) return res.status(400).json({ status: 'error', message: 'Missing email' });

    // Forward the email to Google Apps Script
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    // Read the response from Apps Script
    const data = await response.json();

    // Send it back to the frontend
    res.json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ status: 'error', message: 'Proxy failed' });
  }
});

// Start server (use your production port if needed)
app.listen(3000, () => console.log('✅ Proxy running on http://localhost:3000'));