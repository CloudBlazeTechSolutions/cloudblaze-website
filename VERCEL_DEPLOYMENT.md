# Deploying to Vercel

Your website is now configured to work with Vercel's serverless functions.

## What Changed

1. **Created `/api/contact.js`** - Serverless function for handling contact form submissions
2. **Created `vercel.json`** - Vercel configuration file
3. Your original `server.js` is kept for local development

## Deployment Steps

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add Vercel serverless function for contact form"
git push origin main
```

### Step 2: Deploy to Vercel

**Option A: Via Vercel Dashboard (Recommended)**

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect the settings
5. Click **"Deploy"**

**Option B: Via Vercel CLI**

```bash
npm install -g vercel
vercel login
vercel
```

### Step 3: Add Environment Variables in Vercel

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:

| Variable Name | Value |
|--------------|-------|
| `SMTP_HOST` | `smtppro.zoho.eu` |
| `SMTP_PORT` | `587` |
| `EMAIL_USER` | `sales@cloudblazetech.com` |
| `EMAIL_PASS` | `Robijn@nl123` |

**Important:** Select **Production**, **Preview**, and **Development** for each variable.

### Step 4: Redeploy

After adding environment variables:
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **"..."** menu → **"Redeploy"**

## Testing

Once deployed, your website will be available at:
- `https://your-project-name.vercel.app`

Test the contact form to ensure emails are being sent.

## Custom Domain (Optional)

To use your custom domain (cloudblazetech.com):
1. Go to **Settings** → **Domains**
2. Add your domain: `www.cloudblazetech.com`
3. Follow Vercel's DNS configuration instructions

## Local Development

For local development, continue using:
```bash
npm start
```

This will run the Express server on http://localhost:3000

## Files Structure

```
cloudblaze-website/
├── api/
│   └── contact.js          # Vercel serverless function
├── index.html              # Main website
├── server.js               # Local development server
├── vercel.json             # Vercel configuration
├── package.json            # Dependencies
├── .env                    # Local environment variables (not deployed)
└── .gitignore              # Git ignore file
```

## Troubleshooting

**Contact form not working after deployment:**
- Check that all environment variables are set in Vercel
- Check the Functions logs in Vercel Dashboard
- Ensure you redeployed after adding environment variables

**Email authentication error:**
- Verify the EMAIL_PASS is correct
- Check if Zoho requires app-specific password
- Check Vercel Function logs for detailed error messages

## Support

For issues, check:
- Vercel Functions logs: Dashboard → Your Project → Functions
- Vercel deployment logs: Dashboard → Your Project → Deployments → [Latest] → View Logs
