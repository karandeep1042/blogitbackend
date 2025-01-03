const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'itblog87@gmail.com',
        pass: 'mfuy pqxb myxb leis', 
    },
});


const otpStore = {};


app.post('/send-mail', async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).send({ message: 'Email and OTP are required' });
    }

    
    otpStore[email] = otp;

    const mailOptions = {
        from: 'itblog87@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is ${otp}. It is valid only while you are on the verification page.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Mail sent successfully' });
    } catch (error) {
        console.error('Error sending mail:', error);
        res.status(500).send({ message: 'Failed to send mail' });
    }
});


app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).send({ message: 'Email and OTP are required' });
    }

    const storedOtp = otpStore[email];

    if (storedOtp && storedOtp === otp) {
        delete otpStore[email]; 
        return res.status(200).send({ message: 'OTP verified successfully' });
    }

    res.status(400).send({ message: 'Invalid OTP' });
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



// user: 'modelcollegedhrub@gmail.com', 
// pass: 'pxww ilnr jtxp ganr',