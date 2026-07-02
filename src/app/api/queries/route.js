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
    if (apiKey) {
      try {
        const resend = new Resend(apiKey);

        // 1. Confirmation email to the user who submitted the form
        await resend.emails.send({
          from: 'Revenue Law Rajasthan <onboarding@resend.dev>',
          to: body.email,
          subject: `Query Received: ${body.subject}`,
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #1E293B; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 8px; padding: 2rem;">
              <h2 style="color: #0A192F; font-family: serif; border-bottom: 2px solid #C5A880; padding-bottom: 0.5rem; margin-top: 0;">Query Received ✅</h2>
              <p>Dear <strong>${body.name}</strong>,</p>
              <p>Thank you for contacting <strong>Revenue Law Rajasthan</strong>. We have received your query regarding <strong>"${body.subject}"</strong>.</p>
              <p>Our team will get back to you within 48 business hours.</p>
              <div style="background-color: #F8F9FA; padding: 1rem; border-radius: 6px; margin: 1.5rem 0; font-size: 0.9rem; border-left: 3px solid #C5A880;">
                <strong>Your Message:</strong><br />
                ${body.message.replace(/\n/g, '<br />')}
              </div>
              <p style="font-size: 0.8rem; color: #64748B; margin-top: 2rem; border-top: 1px solid #E2E8F0; padding-top: 1rem;">
                Revenue Law Rajasthan · revenuelawraj@gmail.com · +91 9982057461
              </p>
            </div>
          `
        });

        // 2. Admin notification email to your inbox
        await resend.emails.send({
          from: 'Revenue Law Rajasthan <onboarding@resend.dev>',
          to: 'revenuelawraj@gmail.com',
          subject: `📩 New Contact Form: ${body.subject}`,
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #1E293B; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 8px; padding: 2rem;">
              <h2 style="color: #0A192F; font-family: serif; border-bottom: 2px solid #C5A880; padding-bottom: 0.5rem; margin-top: 0;">New Contact Form Submission</h2>
              <table style="width:100%; font-size: 0.95rem; border-collapse: collapse;">
                <tr><td style="padding: 0.5rem; color:#64748B; width:130px;"><strong>Name</strong></td><td style="padding: 0.5rem;">${body.name}</td></tr>
                <tr style="background:#F8F9FA;"><td style="padding: 0.5rem;"><strong>Email</strong></td><td style="padding: 0.5rem;"><a href="mailto:${body.email}">${body.email}</a></td></tr>
                <tr><td style="padding: 0.5rem;"><strong>Phone</strong></td><td style="padding: 0.5rem;">${body.phone || 'Not provided'}</td></tr>
                <tr style="background:#F8F9FA;"><td style="padding: 0.5rem;"><strong>Subject</strong></td><td style="padding: 0.5rem;">${body.subject}</td></tr>
              </table>
              <div style="background-color: #F8F9FA; padding: 1rem; border-radius: 6px; margin: 1.5rem 0; font-size: 0.9rem; border-left: 3px solid #C5A880;">
                <strong>Message:</strong><br /><br />
                ${body.message.replace(/\n/g, '<br />')}
              </div>
              <p style="font-size: 0.8rem; color: #64748B;">Reply directly to this email or contact at <a href="mailto:${body.email}">${body.email}</a></p>
            </div>
          `
        });

      } catch (emailErr) {
        console.error("Resend email error:", emailErr);
      }
    }

    return NextResponse.json({ success: true, query });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
