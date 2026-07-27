"use client";

import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Gavel, HelpCircle } from 'lucide-react';
import thirdScheduleData from '@/lib/third_schedule.json';

export default function ThirdScheduleTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ALL'); // ALL, SUITS, APPLICATIONS, APPEALS
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter items based on active tab and search query
  const filteredItems = thirdScheduleData.filter(item => {
    // Tab filter
    const sNoNum = parseFloat(item.sNo);
    let matchesTab = true;
    if (activeTab === 'SUITS') {
      matchesTab = !isNaN(sNoNum) && sNoNum <= 35 && !item.sNo.startsWith('35-');
    } else if (activeTab === 'APPLICATIONS') {
      matchesTab = item.sNo.startsWith('35-') || (!isNaN(sNoNum) && sNoNum >= 36 && sNoNum <= 85);
    } else if (activeTab === 'APPEALS') {
      matchesTab = !isNaN(sNoNum) && sNoNum >= 86;
    }

    // Search query filter
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      item.sNo.toLowerCase().includes(query) ||
      item.section.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.court.toLowerCase().includes(query) ||
      item.limitation.toLowerCase().includes(query) ||
      item.courtFee.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset page on tab change
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset page on search
  };

  return (
    <div className="third-schedule" style={{
      background: 'white',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      padding: '2.5rem',
      boxShadow: 'var(--shadow-sm)',
      marginTop: '3rem',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      {/* Title Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', borderLeft: '4px solid var(--accent-gold)', paddingLeft: '1rem' }}>
        <Gavel size={22} style={{ color: 'var(--accent-gold)' }} />
        <div>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-blue)', margin: 0, fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            Third Schedule — Suits, Applications and Appeals
          </h3>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Verbatim list under Section 207 of the Rajasthan Tenancy Act, 1955 defining jurisdiction and limitation
          </p>
        </div>
      </div>

      {/* Search and Tabs Controller */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        {/* Search Bar */}
        <div style={{
          position: 'relative',
          background: 'white',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          padding: '0.4rem 1rem',
          display: 'flex',
          alignItems: 'center',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)'
        }}>
          <Search size={18} style={{ color: 'var(--text-muted)', marginRight: '0.75rem' }} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search the Third Schedule by Section, Suit Description, Court, or Limitation..."
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-sans)',
              color: 'var(--text-dark)',
              backgroundColor: 'transparent',
              padding: '0.5rem 0'
            }}
          />
        </div>

        {/* Tab Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0.75rem'
        }}>
          {[
            { id: 'ALL', label: 'All Matters' },
            { id: 'SUITS', label: 'Suits (Matters 1-35)' },
            { id: 'APPLICATIONS', label: 'Applications (Matters 35-A - 85)' },
            { id: 'APPEALS', label: 'Appeals (Matters 86-90)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                borderRadius: '6px',
                border: '1px solid',
                borderColor: activeTab === tab.id ? 'var(--primary-blue)' : 'transparent',
                backgroundColor: activeTab === tab.id ? 'var(--primary-blue)' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'var(--text-dark)',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
              onMouseEnter={e => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = 'var(--bg-offwhite)';
                }
              }}
              onMouseLeave={e => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table Content Container */}
      <div className="schedule-table-scroll" role="region" aria-label="Third Schedule table; scroll horizontally to view all columns" tabIndex={0} style={{ width: '100%', overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '1.5rem' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.88rem',
          textAlign: 'left',
          minWidth: '950px'
        }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-offwhite)', borderBottom: '2px solid var(--border-color)' }}>
              <th style={{ padding: '1rem 1.25rem', color: 'var(--primary-blue)', fontWeight: 700, width: '70px' }}>S.No.</th>
              <th style={{ padding: '1rem 1.25rem', color: 'var(--primary-blue)', fontWeight: 700, width: '120px' }}>Section</th>
              <th style={{ padding: '1rem 1.25rem', color: 'var(--primary-blue)', fontWeight: 700, width: '320px' }}>Description of Suit / Application / Appeal</th>
              <th style={{ padding: '1rem 1.25rem', color: 'var(--primary-blue)', fontWeight: 700, width: '110px' }}>Limitation</th>
              <th style={{ padding: '1rem 1.25rem', color: 'var(--primary-blue)', fontWeight: 700, width: '150px' }}>Limitation Start</th>
              <th style={{ padding: '1rem 1.25rem', color: 'var(--primary-blue)', fontWeight: 700, width: '110px' }}>Court Fee</th>
              <th style={{ padding: '1rem 1.25rem', color: 'var(--primary-blue)', fontWeight: 700, width: '150px' }}>Competent Court</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, idx) => (
                <tr 
                  key={idx}
                  style={{ 
                    borderBottom: '1px solid var(--border-color)', 
                    backgroundColor: idx % 2 === 1 ? 'rgba(250,248,245,0.4)' : 'white',
                    transition: 'var(--transition-fast)'
                  }}
                  className="schedule-row-hover"
                >
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--primary-blue)' }}>{item.sNo}</td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--accent-gold)' }}>{item.section}</td>
                  <td style={{ padding: '1rem 1.25rem', lineHeight: '1.4', color: 'var(--text-dark)' }}>{item.description}</td>
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--text-dark)' }}>{item.limitation}</td>
                  <td style={{ padding: '1rem 1.25rem', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>{item.limitationStart}</td>
                  <td style={{ padding: '1rem 1.25rem', fontSize: '0.82rem', color: 'var(--text-dark)' }}>{item.courtFee}</td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 500, color: 'var(--primary-blue)' }}>{item.court}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--text-muted)' }}>
                  <HelpCircle size={32} style={{ color: 'var(--accent-gold)', margin: '0 auto 0.75rem auto' }} />
                  <p style={{ margin: 0 }}>No items match your search or filter settings.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredItems.length)} of {filteredItems.length} entries
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'white',
                color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                transition: 'var(--transition-fast)'
              }}
            >
              &larr;
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const pg = i + 1;
              const shouldRender = pg === 1 || pg === totalPages || Math.abs(pg - currentPage) <= 1;
              if (!shouldRender) {
                if (pg === 2 || pg === totalPages - 1) {
                  return <span key={pg} style={{ padding: '0 0.25rem', color: 'var(--text-muted)' }}>...</span>;
                }
                return null;
              }
              return (
                <button
                  key={pg}
                  onClick={() => handlePageChange(pg)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: currentPage === pg ? 'var(--primary-blue)' : 'var(--border-color)',
                    backgroundColor: currentPage === pg ? 'var(--primary-blue)' : 'white',
                    color: currentPage === pg ? 'white' : 'var(--text-dark)',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  {pg}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'white',
                color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                transition: 'var(--transition-fast)'
              }}
            >
              &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Global CSS tweaks */}
      <style jsx global>{`
        .schedule-row-hover:hover {
          background-color: rgba(197, 168, 128, 0.08) !important;
        }
      `}</style>
    </div>
  );
}
