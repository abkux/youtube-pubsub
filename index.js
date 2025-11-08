import express from "express";
import dotenv from "dotenv";
import { sendDiscordWebhook } from "send-discord-webhook";

dotenv.config();

const WEBHOOK_URL = process.env.WEBHOOK;
const SERVER_PORT = process.env.PORT;

const app = express();
app.use(express.text({ type: 'application/atom+xml' }));

app.get('/webhook', (req, res) => {
    res.status(200).send(req.query['hub.challenge']);
});

app.post('/webhook', async(req, res) => {
    const xml = req.body;

    await sendDiscordWebhook({
        url: WEBHOOK_URL,
        content: xml
    })
    res.status(200).send('OK');
})

app.listen(SERVER_PORT, () => {
    console.log(`✨ web server running on ${SERVER_PORT}`)
})