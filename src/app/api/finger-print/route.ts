import { NextRequest } from "next/server";
import { ApiResponse } from "../response";
import clientPromise from "@/utils/mongodb";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const fingerprint = searchParams.get('fingerprint');

    if (!fingerprint) {
        return ApiResponse.badRequest('Fingerprint is required');
    }

    const client = await clientPromise;
    const db = client.db('petition');
    const collection = db.collection('signatures');

    const signature = await collection.findOne({ fingerprint });

    return ApiResponse.ok({ hasSigned: !!signature, signedAt: signature?.signedAt });
}