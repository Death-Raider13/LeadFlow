// server.js - Simple Node.js backend for Gmail SMTP
// Install dependencies: npm install express nodemailer cors body-parser dotenv

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Gmail SMTP Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD // Your Gmail App Password
    }
});

// Verify transporter configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ SMTP configuration error:', error);
    } else {
        console.log('✅ Server is ready to send emails');
    }
});

// Email sending endpoint
app.post('/send-email', async (req, res) => {
    const { to, subject, htmlContent, senderName } = req.body;

    // Validation
    if (!to || !subject || !htmlContent) {
        return res.status(400).json({
            success: false,
            error: 'Missing required fields: to, subject, htmlContent'
        });
    }

    const mailOptions = {
        from: `${senderName || 'LeadFlow'} <${process.env.GMAIL_USER}>`,
        to: to,
        subject: subject,
        html: htmlContent,
        text: htmlContent.replace(/<[^>]*>/g, '') // Plain text fallback
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        
        res.json({
            success: true,
            messageId: info.messageId,
            response: info.response
        });
    } catch (error) {
        console.error('Email sending error:', error);
        
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Email server is running' });
});

app.listen(PORT, () => {
    console.log(`🚀 Email server running on http://localhost:${PORT}`);
    console.log(`📧 Gmail account: ${process.env.GMAIL_USER}`);
});