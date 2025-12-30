# Google Analytics 4 Setup Guide

Your website now has Google Analytics 4 tracking code installed. Follow these steps to activate it and start tracking your traffic.

## Quick Setup (5 minutes)

### Step 1: Create Google Analytics Account
1. Go to [analytics.google.com](https://analytics.google.com)
2. Sign in with your Google account
3. Click "Start measuring"
4. Create an Account name (e.g., "Taha Merghani Personal Site")
5. Click "Next"

### Step 2: Create a Property
1. Property name: "taha-y-merghani.github.io"
2. Time zone: Select your timezone
3. Currency: USD (or your preference)
4. Click "Next"

### Step 3: Set Up Data Stream
1. Select "Web" as the platform
2. Website URL: `https://taha-y-merghani.github.io`
3. Stream name: "Main Website"
4. Click "Create stream"

### Step 4: Get Your Measurement ID
1. After creating the stream, you'll see your **Measurement ID** (format: `G-XXXXXXXXXX`)
2. Copy this ID

### Step 5: Update Your Website
1. Open `index.html` in your editor
2. Find the two instances of `G-XXXXXXXXXX` (lines 10 and 15)
3. Replace both with your actual Measurement ID
4. Save the file
5. Run the build script: `npm run build`
6. Commit and push: `git add -A && git commit -m "Activate Google Analytics" && git push`

**Done!** Your analytics will start tracking within 24-48 hours.

## What You'll See (Like Medium)

Once active, you'll get insights similar to Medium:

### Real-Time Stats
- Current active users on your site
- Pages being viewed right now
- Traffic sources (where readers came from)

### Page Views & Engagement
- Total pageviews per article
- Average engagement time (like Medium's read time)
- Bounce rate
- Sessions and users

### Traffic Sources
- Organic search (Google, etc.)
- Social media (Twitter, LinkedIn, Reddit)
- Direct traffic
- Referrals from other sites

### Popular Content
- Top performing articles
- Most visited pages
- User journey through your site

### Demographics (if enabled)
- Geographic location of readers
- Device types (mobile vs desktop)
- Browser usage

## Accessing Your Dashboard

1. Go to [analytics.google.com](https://analytics.google.com)
2. Click on your property: "taha-y-merghani.github.io"
3. Key reports:
   - **Reports** → **Engagement** → **Pages and screens** (see which articles perform best)
   - **Reports** → **Acquisition** → **Traffic acquisition** (see where readers come from)
   - **Reports** → **Realtime** (see current activity)

## Custom Reports (Advanced)

Create custom reports to track specific metrics:
- Compare article performance over time
- Track conversion from homepage → articles
- Monitor Reddit/HN traffic spikes
- A/B test headlines by tracking CTR

## Privacy Note

GA4 is GDPR-compliant and privacy-focused compared to older Universal Analytics. It:
- Automatically anonymizes IP addresses
- Respects Do Not Track browser settings
- Provides data retention controls

## Troubleshooting

**Not seeing data after 48 hours?**
1. Verify your Measurement ID is correct in `index.html`
2. Check that you've rebuilt and deployed: `npm run build && git push`
3. Test in incognito mode (ad blockers may block GA)
4. Use [Google Tag Assistant](https://tagassistant.google.com) to verify tracking

**Want to exclude your own visits?**
1. In GA4, go to Admin → Data Streams → Your stream
2. Click "Configure tag settings"
3. Click "Show all" under "Settings"
4. Click "Define internal traffic"
5. Add your IP address

## Alternative: Privacy-Focused Analytics

If you prefer privacy-focused alternatives (no cookies, GDPR-friendly):
- **Plausible** ($9/month) - Simple, privacy-first
- **Fathom** ($14/month) - Privacy-focused, beautiful UI
- **GoatCounter** (Free/Open Source) - Minimal, privacy-respecting

Let me know if you want to switch to any of these instead!
