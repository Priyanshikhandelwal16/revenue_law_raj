import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import dbConnect from '@/lib/db';
import Query from '@/lib/models/Query';
import { verifyToken } from '@/lib/auth';

export async function GET(req) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    const queries = await Query.find({}).sort({ createdAt: -1 });
    return NextResponse.json(queries);
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const query = await Query.create(body);

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey && apiKey !== 're_123456789') {
      try {
        const resendInstance = new Resend(apiKey);
        await resendInstance.emails.send({
          from: process.env.EMAIL_FROM || 'notifications@rajasthanrevenue.law',
          to: body.email,
          subject: `[Revenue Law Raj] Ticket Received: ${body.subject}`,
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #1E293B; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 8px; padding: 2rem;">
              <h2 style="color: #0A192F; font-family: serif; border-bottom: 2px solid #C5A880; padding-bottom: 0.5rem; margin-top: 0;">Consultation Ticket Confirmed</h2>
              <p>Dear <strong>${body.name}</strong>,</p>
              <p>We have successfully received your inquiry ticket regarding <strong>"${body.subject}"</strong>.</p>
              <p>Our editorial and legal secretariat will review the details and get back to you shortly.</p>
              <div style="background-color: #F8F9FA; padding: 1rem; border-radius: 6px; margin: 1.5rem 0; font-size: 0.9rem; border-left: 3px solid #C5A880;">
                <strong>Your Message:</strong><br />
                ${body.message.replace(/\n/g, '<br />')}
              </div>
              <p style="font-size: 0.8rem; color: #64748B; margin-top: 2rem; border-top: 1px solid #E2E8F0; padding-top: 1rem;">
                This is an automated notification from the Rajasthan Revenue Law Knowledge Platform. Please do not reply directly to this email.
              </p>
            </div>
          `
        });
      } catch (emailErr) {
        console.error("Resend email dispatch error:", emailErr);
      }
    }

    return NextResponse.json({ success: true, query });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
