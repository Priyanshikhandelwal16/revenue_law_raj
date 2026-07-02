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

  return (
    <div className="news-sidebar-sticky no-print">
      {/* Latest News */}
      <div className="sidebar-widget">
        <h3><Newspaper size={16} style={{ marginRight: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }} /> Latest News</h3>
        <ul className="sidebar-news-list">
          {loading ? (
            <li className="sidebar-news-item" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Loading news...</li>
          ) : data.articles && data.articles.length > 0 ? (
            data.articles.map(article => (
              <li key={article._id} className="sidebar-news-item">
                <span className="sidebar-news-category">{article.category}</span>
                <Link href={`/articles/${article.slug}`} className="sidebar-news-title">
                  {article.title}
                </Link>
                <span className="sidebar-news-date">{formatDate(article.createdAt)}</span>
              </li>
            ))
          ) : (
            <li className="sidebar-news-item" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No recent news.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
