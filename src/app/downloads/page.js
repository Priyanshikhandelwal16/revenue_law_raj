import { Download, FileText, FileSpreadsheet, FileArchive, Search, Clock } from 'lucide-react';
import dbConnect from '@/lib/db';
import DownloadModel from '@/lib/models/Download';
import NewsSidebar from '@/components/NewsSidebar';
import Link from 'next/link';

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

  const getFileIcon = (type) => {
    switch (type.toUpperCase()) {
      case 'PDF': return <FileText size={24} style={{ color: '#E11D48' }} />;
      case 'XLS':
      case 'XLSX': return <FileSpreadsheet size={24} style={{ color: '#16A34A' }} />;
      case 'ZIP': return <FileArchive size={24} style={{ color: '#D97706' }} />;
      default: return <FileText size={24} style={{ color: 'var(--primary-blue)' }} />;
    }
  };

  return (
    <div className="layout-container" style={{ padding: '3rem 1.5rem' }}>
      <div className="layout-with-sidebar">
        <div>
          {/* Header */}
          <div style={{ backgroundColor: 'var(--bg-white)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '2.5rem 2rem', marginBottom: '2rem' }}>
            <span style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              bare acts & utility templates
            </span>
            <h1 style={{ fontSize: '2.25rem', color: 'var(--primary-blue)', margin: '0.5rem 0 1rem 0' }}>
              Downloads & Forms Portal
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Download draft petitions, official application formats, and consolidated legal texts for offline practice.
            </p>
          </div>

          {/* List Display */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {downloads.map(d => (
              <div 
                key={d._id} 
                style={{
                  backgroundColor: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'var(--transition-normal)'
                }}
                className="premium-card"
              >
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <div style={{
                    backgroundColor: 'var(--bg-offwhite)',
                    width: '56px',
                    height: '56px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border-color)',
                    flexShrink: 0
                  }}>
                    {getFileIcon(d.fileType)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-blue)', fontWeight: 600 }}>{d.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0' }}>{d.description}</p>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                      <span style={{ backgroundColor: 'var(--bg-offwhite)', padding: '0.1rem 0.4rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontWeight: 600 }}>
                        {d.fileType}
                      </span>
                      <span>File Size: {d.fileSize || 'N/A'}</span>
                      <span>Total Downloads: {d.downloadCount || 0}</span>
                    </div>
                  </div>
                </div>

                <a 
                  href={d.fileData ? (d.fileData.startsWith('data:') ? d.fileData : `data:application/octet-stream;base64,${d.fileData}`) : d.fileUrl}
                  download={`rrlkp_form_${d.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${d.fileType.toLowerCase()}`}
                  style={{
                    backgroundColor: 'var(--primary-blue)',
                    color: 'white',
                    padding: '0.75rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'var(--transition-normal)',
                    cursor: 'pointer'
                  }}
                  className="btn-primary"
                  title="Download File"
                >
                  <Download size={18} />
                </a>
              </div>
            ))}
          </div>
        </div>
        <NewsSidebar />
      </div>
    </div>
  );
}
