import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import UploadSession from '@/lib/models/UploadSession';
import { verifyToken } from '@/lib/auth';

export async function POST(req) {
  try {
    // Authenticate the admin user
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    const { uploadId, chunkIndex, totalChunks, chunkData, fileName, fileType, fileSize } = await req.json();

    if (!uploadId || chunkIndex === undefined || !totalChunks || !chunkData) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Find or create the upload session
    let session = await UploadSession.findOne({ uploadId });
    if (!session) {
      session = new UploadSession({
        uploadId,
        totalChunks,
        fileName,
        fileType,
        fileSize,
        chunks: {}
      });
    }

    // Save the chunk data (store chunkIndex as a string key in map)
    session.chunks.set(chunkIndex.toString(), chunkData);
    await session.save();

    const currentChunkCount = session.chunks.size;
    const isCompleted = currentChunkCount === totalChunks;

    return NextResponse.json({
      success: true,
      chunkIndex,
      totalChunks,
      receivedChunks: currentChunkCount,
      completed: isCompleted
    });
  } catch (err) {
    console.error("Chunk upload error:", err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
