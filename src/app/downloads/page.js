import { FileText } from 'lucide-react';
import dbConnect from '@/lib/db';
import DownloadModel from '@/lib/models/Download';
import NewsSidebar from '@/components/NewsSidebar';
import DownloadsList from '@/components/DownloadsList';

// Mock baseline files
const defaultDownloads = [
  {
    _id: "d1",
    title: "Form-A: Application for Land Conversion under Section 90-A",
    description: "Official form submitted to the SDO/Local Authority for converting agricultural holdings to residential/commercial layouts.",
    fileType: "PDF",
    fileSize: "850 KB",
    fileUrl: "#",
    downloadCount: 420
  },
  {
    _id: "d2",
    title: "Model Mutation Application Form (Fauti/Succession)",
    description: "Template for recording mutation in land records following death of a Khatedar tenant (submitted to Patwari/Tehsildar).",
    fileType: "DOCX",
    fileSize: "120 KB",
    fileUrl: "#",
    downloadCount: 310
  },
  {
    _id: "d3",
    title: "Draft Revision Petition Format - Board of Revenue Ajmer",
    description: "Standard model legal drafting template for filing Revision Petitions under Section 230 of the Rajasthan Land Revenue Act.",
    fileType: "PDF",
    fileSize: "1.1 MB",
    fileUrl: "#",
    downloadCount: 560
  },
  {
    _id: "d4",
    title: "Rajasthan Tenancy Act, 1955 - Consolidated Bare Act Book",
    description: "Amended copy of the complete Rajasthan Tenancy Act, incorporating all rules up to the 2026 amendments.",
    fileType: "PDF",
    fileSize: "3.4 MB",
    fileUrl: "#",
    downloadCount: 1250
  }
];

async function getDownloads() {
  try {
    await dbConnect();
    const list = await DownloadModel.find({});
    return list.length > 0 ? list : defaultDownloads;
  } catch (err) {
    console.error(err);
    return defaultDownloads;
  }
}

export default async function DownloadsPage() {
  const downloads = await getDownloads();

  return (
    <div>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #FAF8F5 0%, #EFECE6 100%)',
        borderBottom: '4px solid var(--accent-gold)',
        padding: '5rem 0 4rem 0',
        textAlign: 'center',
        color: 'var(--text-dark)'
      }}>
        <div className="layout-container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(30, 27, 24, 0.05)', border: '1px solid rgba(30, 27, 24, 0.15)', borderRadius: '50px', padding: '0.35rem 1rem', marginBottom: '1.5rem' }}>
            <FileText size={14} style={{ color: 'var(--accent-gold-hover)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Bare Acts & Utility Templates</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: 'var(--primary-blue)' }}>
            Downloads & Forms Portal<br />
            <span style={{ color: '#B38F4F' }}>Legal Drafts & Templates</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Download draft petitions, official application formats, and consolidated legal texts for offline practice.
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>
        <div className="layout-with-sidebar">
          <div>

          {/* List Display */}
          <DownloadsList initialDownloads={JSON.parse(JSON.stringify(downloads))} />
        </div>
        <NewsSidebar />
      </div>
    </div>
    </div>
  );
}
