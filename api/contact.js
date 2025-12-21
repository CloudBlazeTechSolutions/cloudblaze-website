const nodemailer = require('nodemailer');

// Vercel serverless function for contact form
module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request for CORS
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });
    }

    try {
        const { name, email, company, service, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and message'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Create transporter for sending emails
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: parseInt(process.env.SMTP_PORT) === 465,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Prepare email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'sales@cloudblazetech.com',
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #0066cc;">New Contact Form Submission</h2>
                    <div style="background-color: #f9fafb; padding: 20px; border-radius: 10px;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
                        <p><strong>Service Interested In:</strong> ${service || 'Not specified'}</p>
                        <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
                        This email was sent from the CloudBlaze Tech Solutions website contact form.
                    </p>
                </div>
            `,
            replyTo: email
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Send success response
        return res.status(200).json({
            success: true,
            message: 'Thank you for contacting us! We will get back to you soon.'
        });

    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.'
        });
    }
};
