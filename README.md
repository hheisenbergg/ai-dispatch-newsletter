# The AI Dispatch 📡
**Noise canceling headphones for your career.**

A brutalist, anti-hype AI newsletter platform. Built with raw HTML/CSS/JS to reflect the "no-nonsense" ethos of the content.

## 🎨 Design Philosophy
- **Anti-Minimalist / High Energy**: Uses a "Highlighter" theme with Acid Lime, Hot Pink, and stark black/white contrast.
- **Interactive Branding**: Features multiple interactive 2D pixel-art mascots (The Glitch Cat, The TV Head, The Guardian).
- **Responsive**: Fully optimized for mobile with a "Linear Flow" layout that transforms floating widgets into a clean vertical stack.

## 🛠 Tech Stack
- **Core**: Vanilla HTML5, CSS3, JavaScript (ES6+).
- **Animation**: HTML5 Canvas (no external libraries) for pixel art and physics.
- **Backend (API)**: Vercel Serverless Functions (Node.js) for email collection.
- **Storage**: (Planned) Google Sheets or Database integration via API.

## 📂 Project Structure
```bash
/
├── index.html          # Landing Page (Glitch Mascot, Video Widget)
├── style.css           # (Integrated into HTML) Global styles
├── /signup
│   └── index.html      # Signup Form (TV Head Mascot, Bento Grid)
├── /api
│   └── subscribe.js    # Serverless function for form submission
└── /animation          # Static assets (videos, gifs)
```

## 🚀 Development
1. **Local Run**: 
   Since it's vanilla, you can just open `index.html` in a browser.
   For API testing, use `vercel dev` or a local server.

2. **Deployment**:
   Ready for **Vercel**. Connect the repo and deploy. 
   Ensure environment variables for email storage are set in Vercel.

## 👾 Mascots
- **The Glitch (Homepage)**: Follows mouse cursor, glitches on click.
- **The Guardian (Homepage)**: Sits on the CTA button, stands up on hover.
- **TV Head (Signup)**: Reacts to input focus (Idle -> Typing -> Success Party).

## 📱 Mobile Behavior
- **Floating Widgets**: On screens < 850px, widgets unpin from corners and stack vertically to preserve readability.
- **Touch**: Hover effects are disabled or adapted for touch interactions.

## ✨ Signup Feature
A high-energy newsletter signup page hosted at `/signup/`.

- **TV Head Mascot**: A reactive pixel-art character that watches you type.
    - **Idle**: Static snow/noise.
    - **Focus**: Displays the word "REC" when typing.
    - **Success**: Breaks into a smiley face party mode.
- **Bento Grid Layout**: A modern, modular grid design for social proof and value props.

### How to use
Simply link to `/signup/` from your socials or homepage. The form submits to the `/api/subscribe` endpoint, which triggers your backend automation (n8n/Make) to handle the subscription process.

## 💔 Unsubscribe Feature
A dedicated pixel-art unsubscribe page that proxies requests to your backend (n8n/Make) via a verified webhook.

### How to Link in Emails
In your newsletter footer, use this URL format:
```
https://your-site.vercel.app/unsubscribe/?token={{subscriber_id}}
```
Replace `{{subscriber_id}}` with the variable your email provider uses for unique user IDs.

## ⚙️ Configuration & Environment Variables
To enable both the Signup and Unsubscribe features, set these variables in your Vercel project settings:

| Variable | Purspose |
| :--- | :--- |
| `SUBSCRIBE_WEBHOOK_URL` | Webhook URL (n8n/Make) to handle new signups (POST). |
| `UNSUBSCRIBE_WEBHOOK_URL` | Webhook URL (n8n/Make) to handle unsubscriptions (GET/POST). |
| `WEBHOOK_AUTH_USER` | Username for Basic Auth protection (Shared by both endpoints). |
| `WEBHOOK_AUTH_SECRET` | Password for Basic Auth protection (Shared by both endpoints). |

---
*Hypeless since 2026.*
