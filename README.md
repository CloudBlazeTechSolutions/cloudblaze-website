# CloudBlaze Tech Solutions - Website

Professional website for CloudBlaze Tech Solutions with integrated contact form functionality.

## Features

- Modern, responsive design
- SAP services showcase
- Contact form with email integration
- Animated UI elements
- Mobile-friendly layout

## Setup Instructions

### 1. Install Dependencies

First, install Node.js if you haven't already (download from https://nodejs.org/)

Then install the required packages:

```bash
npm install
```

### 2. Configure Email Settings

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your email credentials:

**For Gmail:**
1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password at: https://myaccount.google.com/apppasswords
3. Use the App Password (not your regular password) in the `.env` file

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here
PORT=3000
```

**For Other Email Providers:**

- **Outlook/Office365:**
  ```
  SMTP_HOST=smtp.office365.com
  SMTP_PORT=587
  EMAIL_USER=your-email@outlook.com
  EMAIL_PASS=your-password
  ```

- **Custom SMTP Server:**
  ```
  SMTP_HOST=your-smtp-server.com
  SMTP_PORT=587
  EMAIL_USER=your-email@domain.com
  EMAIL_PASS=your-password
  ```

### 3. Run the Server

**Development mode (with auto-restart on file changes):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The website will be available at: `http://localhost:3000`

## Testing the Contact Form

1. Open your browser and go to `http://localhost:3000`
2. Scroll down to the contact section
3. Fill out the form and click "Send Message"
4. You should receive an email at `sales@cloudblazetech.com`

## Deployment

### Deploy to a VPS/Server

1. Copy all files to your server
2. Install Node.js on the server
3. Run `npm install`
4. Configure `.env` file with production email settings
5. Use PM2 to keep the server running:
   ```bash
   npm install -g pm2
   pm2 start server.js --name cloudblaze-website
   pm2 save
   pm2 startup
   ```

### Deploy to Cloud Platforms

- **Heroku:** Add a `Procfile` with `web: node server.js`
- **DigitalOcean App Platform:** Use the Node.js buildpack
- **AWS/Azure:** Use their Node.js hosting services

## File Structure

```
cloudblaze-website/
├── index.html          # Main website file
├── server.js           # Backend server with email functionality
├── package.json        # Node.js dependencies
├── .env               # Email configuration (not committed to git)
├── .env.example       # Example configuration
├── .gitignore         # Files to ignore in git
└── README.md          # This file
```

## Email Configuration Notes

- The contact form sends emails to: `sales@cloudblazetech.com`
- Emails are sent from the configured `EMAIL_USER` address
- The reply-to address is set to the form submitter's email
- All form submissions include: Name, Email, Company, Service, and Message

## Troubleshooting

**Email not sending:**
- Check your `.env` file configuration
- Verify SMTP credentials are correct
- For Gmail, ensure you're using an App Password, not your regular password
- Check server logs for error messages

**Port already in use:**
- Change the PORT in `.env` to a different number (e.g., 3001, 8080)

**Form submission error:**
- Check browser console for JavaScript errors
- Ensure server is running on `http://localhost:3000`
- Verify network connection

## Support

For questions or issues, contact: sales@cloudblazetech.com
