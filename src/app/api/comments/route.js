import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import dbConnect from '@/lib/db';
import Comment from '@/lib/models/Comment';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const entityId = searchParams.get('entityId');
    const adminMode = searchParams.get('adminMode');

    let query = {};
    if (entityId) query.entityId = entityId;

    if (adminMode !== 'true') {
      query.isApproved = true;
    } else {
      const decoded = verifyToken(req);
      if (!decoded || decoded.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      }
    }

    const comments = await Comment.find(query).sort({ createdAt: -1 });
    return NextResponse.json(comments);
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.entityId || !body.entityType || !body.authorName || !body.authorEmail || !body.content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const comment = await Comment.create({
      entityId: body.entityId,
      entityType: body.entityType,
      authorName: body.authorName,
      authorEmail: body.authorEmail,
      content: body.content,
      isApproved: false
    });

    // Send admin notification email when a user submits a Professional Discussion comment
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      try {
        const resend = new Resend(apiKey);

        // Admin notification email
        await resend.emails.send({
          from: "Revenue Law Rajasthan <noreply@revenuelawraj.com>",
          to: 'revenuelawraj@gmail.com',
          reply_to: body.authorEmail,
          subject: `📩 New Discussion Comment: ${body.entityType}`,
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #1E293B; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 8px; padding: 2rem;">
              <h2 style="color: #0A192F; font-family: serif; border-bottom: 2px solid #C5A880; padding-bottom: 0.5rem; margin-top: 0;">New Professional Discussion Comment</h2>
              <table style="width:100%; font-size: 0.95rem; border-collapse: collapse;">
                <tr><td style="padding: 0.5rem; color:#64748B; width:130px;"><strong>Name</strong></td><td style="padding: 0.5rem;">${body.authorName}</td></tr>
                <tr style="background:#F8F9FA;"><td style="padding: 0.5rem;"><strong>Email</strong></td><td style="padding: 0.5rem;"><a href="mailto:${body.authorEmail}">${body.authorEmail}</a></td></tr>
                <tr><td style="padding: 0.5rem;"><strong>Type</strong></td><td style="padding: 0.5rem;">${body.entityType}</td></tr>
                <tr style="background:#F8F9FA;"><td style="padding: 0.5rem;"><strong>Entity ID</strong></td><td style="padding: 0.5rem;">${body.entityId}</td></tr>
              </table>
              <div style="background-color: #F8F9FA; padding: 1rem; border-radius: 6px; margin: 1.5rem 0; font-size: 0.9rem; border-left: 3px solid #C5A880;">
                <strong>Comment:</strong><br /><br />
                ${(body.content || '').replace(/\n/g, '<br />')}
              </div>
              <p style="font-size: 0.8rem; color: #64748B;">Reply directly to this email or contact at <a href="mailto:${body.authorEmail}">${body.authorEmail}</a></p>
            </div>
          `
        });

        // Confirmation email to the commenter
        await resend.emails.send({
          from: "Revenue Law Rajasthan <noreply@revenuelawraj.com>",
          to: body.authorEmail,
          reply_to: 'revenuelawraj@gmail.com',
          subject: `Comment Received: ${body.entityType}`,
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #1E293B; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 8px; padding: 2rem;">
              <h2 style="color: #0A192F; font-family: serif; border-bottom: 2px solid #C5A880; padding-bottom: 0.5rem; margin-top: 0;">Comment Received ✅</h2>
              <p>Dear <strong>${body.authorName}</strong>,</p>
              <p>Thank you for contributing to the <strong>Professional Discussion</strong> on Revenue Law Rajasthan. Your comment has been received and is pending moderator approval.</p>
              <div style="background-color: #F8F9FA; padding: 1rem; border-radius: 6px; margin: 1.5rem 0; font-size: 0.9rem; border-left: 3px solid #C5A880;">
                <strong>Your Comment:</strong><br />
                ${(body.content || '').replace(/\n/g, '<br />')}
              </div>
              <p style="font-size: 0.8rem; color: #64748B; margin-top: 2rem; border-top: 1px solid #E2E8F0; padding-top: 1rem;">
                Revenue Law Rajasthan · B-30, Jamuna Nagar, Sodala, Jaipur · +91 99820 57461
              </p>
            </div>
          `
        });

      } catch (emailErr) {
        console.error("Resend comment email error:", emailErr);
      }
    }

    return NextResponse.json({ success: true, comment });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
