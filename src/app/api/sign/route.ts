import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/utils/mongodb';
import { ApiResponse } from '../response';

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const body = await req.json();

    const { name, email, comment, fingerprint } = body;

    console.log(name, email, comment, fingerprint)

    if (!name || !email || !fingerprint) {
      return ApiResponse.badRequest('Name, email, and fingerprint are required.');
    }

    const existingSignature = await db.collection('signatures').findOne({ fingerprint });

    if (existingSignature) {
      return ApiResponse.badRequest('You have already signed the petition.');
    }

    const result = await db.collection('signatures').insertOne({ name, email, comment, fingerprint });

    if (result.acknowledged) {
      return ApiResponse.ok({ message: 'Thank you for signing the petition!' });
    } else {
      return ApiResponse.badRequest('Failed to sign the petition.');
    }
  } catch (error) {
    console.error(error);
    return ApiResponse.badRequest('An error occurred while signing the petition.');
  }
}