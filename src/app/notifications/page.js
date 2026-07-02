import { Bell, Calendar, Download, FileText, Landmark } from 'lucide-react';
import dbConnect from '@/lib/db';
import Notification from '@/lib/models/Notification';
import NewsSidebar from '@/components/NewsSidebar';
import Link from 'next/link';

// Mock list fallback
const defaultNotifications = [
  {
    _id: "n1",
    title: "Rajasthan Land Revenue (Allotment of Land for Agricultural Purposes) (Amendment) Rules, 2026",
    refNumber: "F.4(2)Rev-6/2026/18",
    department: "Revenue (Group 6) Department, Jaipur",
    publishDate: new Date().toISOString(),
    summary: "Amendments reducing interest charges for regularisation of agricultural plots allocated under scheduled caste welfare rules."
  },
  {
    _id: "n2",
    title: "Delegation of conversion sanction power under Section 90-A to Sub-Divisional Officers (SDOs) in rural areas",
    refNumber: "F.9(11)Rev-3/2025/44",
    department: "Revenue (Group 3) Department, Jaipur",
    publishDate: new Date(Date.now() - 86400000 * 5).toISOString(),
    summary: "Official circular delegating final sanctioning power for agricultural conversion under 90-A from District Collectors to SDOs to expedite applications."
  },
  {
    _id: "n3",
    title: "Guidelines regarding partition mutations under Section 53 of Rajasthan Tenancy Act",
    refNumber: "F.1(3)Rev/Group-1/2025/08",
    department: "Revenue Department, Government of Rajasthan",
    publishDate: new Date(Date.now() - 86400000 * 12).toISOString(),
    summary: "Directives issued to Tehsildars on recording mutated partitions following family settlement documents without requiring registered deeds."
  }
];

async function getNotifications() {
  try {
    await dbConnect();
    const list = await Notification.find({ status: 'published' }).sort({ publishDate: -1 });
    return list.length > 0 ? list : defaultNotifications;
  } catch (err) {
    console.error(err);
    return defaultNotifications;
  }
}

export default async function NotificationsPage() {
  const notifications = await getNotifications();

  return (
    <div className="layout-container" style={{ padding: '3rem 1.5rem' }}>
      <div className="layout-with-sidebar">
        <div>
          {/* Header */}
          <div style={{ backgroundColor: 'var(--bg-white)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '2.5rem 2rem', marginBottom: '2rem' }}>
            <span style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Gazettes & circulars
            </span>
            <h1 style={{ fontSize: '2.25rem', color: 'var(--primary-blue)', margin: '0.5rem 0 1rem 0' }}>
              Government Notifications
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Track official circulars, orders, and statutory notifications issued by the Revenue Department, Government of Rajasthan.
            </p>
          </div>

          {/* List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {notifications.map(n => (
              <div key={n._id} className="premium-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, backgroundColor: 'rgba(10, 25, 47, 0.05)', color: 'var(--primary-blue)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                    Ref No: {n.refNumber || 'Circular'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={14} />
                    {new Date(n.publishDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--primary-blue)' }}>{n.title}</h3>
                
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', alignItems: 'center' }}>
                  <Landmark size={14} style={{ color: 'var(--accent-gold)' }} />
                  <span>{n.department}</span>
                </div>

                {n.summary && (
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: '1.6' }}>
                    {n.summary}
                  </p>
                )}

                {(n.pdfData || n.pdfUrl) && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                    {/* If there's base64 or url download link */}
                    <a 
                      href={n.pdfData ? (n.pdfData.startsWith('data:') ? n.pdfData : `data:application/pdf;base64,${n.pdfData}`) : n.pdfUrl}
                      download={`notification_${n.refNumber ? n.refNumber.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'document'}.pdf`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'var(--primary-blue)',
                        border: '1px solid var(--border-color)',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        backgroundColor: 'var(--bg-offwhite)'
                      }}
                    >
                      <Download size={14} style={{ color: 'var(--accent-gold)' }} />
                      Download Official Gazette Circular PDF
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <NewsSidebar />
      </div>
    </div>
  );
}
