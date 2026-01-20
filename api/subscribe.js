export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, status: 'error', message: 'Method not allowed' });
  }

  const { email } = req.body;

  // Validate email
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ ok: false, status: 'invalid_email' });
  }

  const webhookUrl = process.env.SUBSCRIBE_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('SUBSCRIBE_WEBHOOK_URL not configured');
    return res.status(500).json({ ok: false, status: 'error' });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    // Forward the response from the webhook
    let data = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!data || typeof data !== 'object') {
      return res.status(200).json({ ok: true, status: 'subscribed' });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error('Webhook request failed:', error);
    return res.status(500).json({ ok: false, status: 'error' });
  }
}
