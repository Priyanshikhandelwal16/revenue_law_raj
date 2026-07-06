"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Newspaper, Gavel, Bell, Download, Search, Tag, Calendar } from 'lucide-react';

export default function NewsSidebar() {
  const [data, setData] = useState({
    articles: [],
    judgments: [],
    notifications: [],
    downloads: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSidebarData() {
      try {
        const res = await fetch('/api/search?sidebar=true');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Failed to load sidebar data', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSidebarData();
  }, []);

  const popularSearches = [
    "Section 90-A",
    "Section 188 Tenancy Act",
    "Board of Revenue Appeal",
    "Mutation Revision",
    "Agricultural land lease",
    "Land conversion charge"
  ];

  const tags = ["Land Laws", "High Court", "Supreme Court", "Colonisation", "Tehsildar Powers", "90-A", "Revenue Board", "Allotment"];

  // Helper to format date nicely
  const formatDate = (dStr) => {
    if (!dStr) return '';
    const date = new Date(dStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const mockArticles = [
    {
      _id: "ticker-1",
      title: "Rajasthan Government Simplifies Section 90-A Conversion for Rural Lands",
      slug: "rajasthan-simplifies-section-90-a-conversion",
      category: "Land Conversion",
      createdAt: new Date().toISOString()
    },
    {
      _id: "ticker-2",
      title: "Board of Revenue Clarifies Mutation Rights of Legal Heirs in Undivided Land",
      slug: "board-of-revenue-clarifies-mutation-rights",
      category: "Judgments Analysis",
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      _id: "ticker-3",
      title: "Understanding Section 188 of Rajasthan Tenancy Act: Protection Against Trespass",
      slug: "understanding-section-188-tenancy-act",
      category: "Legal Commentary",
      createdAt: new Date(Date.now() - 172800000).toISOString()
    },
    {
      _id: "ticker-4",
      title: "New Digital Jamabandi Portal Launched for Real-time Land Records Verification",
      slug: "new-digital-jamabandi-portal",
      category: "Land Records",
      createdAt: new Date(Date.now() - 259200000).toISOString()
    },
    {
      _id: "ticker-5",
      title: "Supreme Court Verdict on Charagah (Pasture) Land Protection in Rajasthan",
      slug: "supreme-court-charagah-land-verdict",
      category: "Supreme Court",
      createdAt: new Date(Date.now() - 345600000).toISOString()
    },
    {
      _id: "ticker-6",
      title: "SDO Court Powers Delegated to Tehsildars for Urgent Partition Injunctions",
      slug: "sdo-powers-delegated-tehsildars",
      category: "Administrative Order",
      createdAt: new Date(Date.now() - 432000000).toISOString()
    }
  ];

  const articlesList = data.articles && data.articles.length > 0 ? data.articles : mockArticles;
  const tickerItems = [...articlesList, ...articlesList];

  return (
    <div className="news-sidebar-sticky no-print">
      {/* Latest News */}
      <div className="sidebar-widget">
        <h3>
          <Newspaper size={16} style={{ marginRight: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }} />
          Latest News
        </h3>
        <div className="sidebar-news-ticker-container" style={{ overflow: 'hidden', height: '320px', position: 'relative', marginTop: '1rem', borderLeft: '2px solid var(--accent-gold)', paddingLeft: '0.75rem' }}>
          {loading ? (
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', padding: '1rem 0' }}>Loading news...</div>
          ) : (
            <ul className="sidebar-news-list scrolling-ticker" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: 0, padding: 0, listStyle: 'none' }}>
              {tickerItems.map((article, idx) => (
                <li key={`${article._id}-${idx}`} className="sidebar-news-item" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)', paddingBottom: '0.75rem' }}>
                  <span className="sidebar-news-category" style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>{article.category}</span>
                  <Link href={`/articles/${article.slug}`} className="sidebar-news-title" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-blue)', textDecoration: 'none', lineHeight: '1.4', display: 'block' }}>
                    {article.title}
                  </Link>
                  <span className="sidebar-news-date" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.2rem' }}>{formatDate(article.createdAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
