export default async function handler(req, res) {
    // Allow both GET and POST requests
    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).json({ ok: false, status: 'error', message: 'Method not allowed' });
    }

    // Get token from query params (GET) or body (POST)
    const token = req.method === 'GET' ? req.query.token : req.body?.token;

    // Validate token: Expecting 32-char hex string (crypto.randomBytes(16).toString('hex'))
    const tokenRegex = /^[0-9a-fA-F]{32}$/;

    if (!token || typeof token !== 'string' || !tokenRegex.test(token)) {
        return res.status(400).json({ ok: false, status: 'invalid_token' });
    }

    const webhookUrl = process.env.UNSUBSCRIBE_WEBHOOK_URL;
    const username = process.env.WEBHOOK_AUTH_USER;
    const password = process.env.WEBHOOK_AUTH_SECRET;



    if (!webhookUrl) {
        console.error('UNSUBSCRIBE_WEBHOOK_URL not configured');
        return res.status(500).json({ ok: false, status: 'error' });
    }

    if (!username || !password) {
        console.error('WEBHOOK_AUTH_USER or WEBHOOK_AUTH_SECRET not configured');
        return res.status(500).json({ ok: false, status: 'error' });
    }

    // Create Basic Auth header
    const authString = Buffer.from(`${username}:${password}`).toString('base64');

    // Build URL with token as query parameter
    const urlWithToken = `${webhookUrl}?token=${encodeURIComponent(token)}`;

    try {
        const response = await fetch(urlWithToken, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${authString}`
            },
        });

        // Parse the response from the webhook
        let data = null;
        try {
            data = await response.json();
        } catch {
            data = null;
        }

        // If n8n returned valid JSON, forward it
        if (data && typeof data === 'object') {
            return res.status(200).json(data);
        }

        // If we couldn't parse JSON and response was an error, treat as error
        if (!response.ok) {
            console.error(`Webhook returned ${response.status}: ${response.statusText}`);
            return res.status(500).json({ ok: false, status: 'error' });
        }

        // If n8n didn't return valid JSON but was 2xx, treat as error
        console.error('Webhook returned invalid or empty response');
        return res.status(500).json({ ok: false, status: 'error' });

    } catch (error) {
        console.error('Webhook request failed:', error);
        return res.status(500).json({ ok: false, status: 'error' });
    }
}
