import { NextRequest } from 'next/server';
import clientPromise from '@/utils/mongodb';
import { ApiResponse } from '../response';
import mailjet from 'node-mailjet';

const mailjetClient = new mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE,
});
export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('petition');
    const body = await req.json();

    const { name, email, comment, fingerprint } = body;

    if (!name || !email || !fingerprint) {
      return ApiResponse.badRequest('Name, email, and fingerprint are required.');
    }

    const existingSignature = await db.collection('signatures').findOne({ fingerprint });

    if (existingSignature) {
      return ApiResponse.badRequest('You have already signed the petition.');
    }

    const result = await db.collection('signatures').insertOne({ fingerprint, signedAt: new Date() });

    if (result.acknowledged) {
      // Send email using Mailjet
      const request = mailjetClient.post("send", { 'version': 'v3.1' }).request({
        "Messages": [
          {
            "From": {
              "Email": process.env.SEND_TO_MAIL,
              "Name": "Petition"
            },
            "To": [
              {
                "Email": process.env.SEND_TO_MAIL,
                "Name": "Recipient"
              }
            ],
            "Subject": "Pétition: nouvelle signature",
            "TextPart": `${name}; ${email};${comment};${new Date()}`,
            "HTMLPart": `<h3>La pétition à été signée par ${name} (${email}).</h3><p>Comment: ${comment}</p><p>${name}; ${email};${comment};${new Date()}</p>`
          }
        ]
      });

      const emailResponse = await request;

      return ApiResponse.ok({ message: 'Thank you for signing the petition!' });
    } else {
      return ApiResponse.badRequest('Failed to sign the petition.');
    }
  } catch (error) {
    console.error(error);
    return ApiResponse.badRequest('An error occurred while signing the petition.');
  }
}