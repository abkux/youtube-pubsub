import { Resend } from 'resend';
import dotenv from 'dotenv'

dotenv.config();

const KEY = process.env.KEY;
const SENDER_ADDRESS = process.env.SENDER;
const RECEIVER_ADDRESS = process.env.RECEIVER;

const resend = new Resend(KEY);

export default async function sendEmail(data) {
    const emailContent = data || 'No content provided';
    
    const { data: result, error } = await resend.emails.send({
        from: SENDER_ADDRESS,
        to: RECEIVER_ADDRESS,
        subject: '🔔 Creator went live',
        text: emailContent,
    });

    if (error) {
        console.error('Error sending email:', error);
        throw error;
    }

    console.log('Email sent successfully:', result);
    return result;
}
