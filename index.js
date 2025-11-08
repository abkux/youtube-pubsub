import express from "express";
import dotenv from "dotenv";
import sendEmail from "./emails/resend.js";

dotenv.config();

const SERVER_PORT = process.env.PORT;

const app = express();
app.use(express.text({ type: 'application/atom+xml' }));
app.use(express.text({ type: 'text/xml' }));
app.use(express.text({ type: 'application/xml' }));

app.get('/', async(req, res) => {
    res.status(200).json({"message": "OK"})
})

app.get('/webhook', async(req, res) => {
    res.status(200).send(req.query['hub.challenge']);
});

app.post('/webhook', async(req, res) => {
    const xml = req.body;
    try {
        await sendEmail(xml);
        res.status(200).send('OK');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
})

app.listen(SERVER_PORT, () => {
    console.log(`✨ web server running on ${SERVER_PORT}`)
})