"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Search, HelpCircle } from 'lucide-react';

const fallbackGlossary = [
  { term: "Khatedar", definition: "A class of tenant in Rajasthan holding occupancy rights in agricultural land, which are hereditary and transferable under the Rajasthan Tenancy Act, 1955." },
  { term: "Jamabandi", definition: "The Record of Rights (RoR) of land showing ownership, area, shares of co-sharers, and revenue liabilities, updated every five years." },
  { term: "Fauti Mutation", definition: "A mutation recorded in revenue records (Khewat/Jamabandi) to transfer land ownership to legal heirs after the demise of the original Khatedar tenant." },
  { term: "Gair-Khatedar", definition: "A tenant who holds temporary or probationary rights in agricultural land, but does not possess transfer rights until regularised under State rules." }
];

export default function GlossaryPage() {
  const [glossary, setGlossary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLetter, setActiveLetter] = useState('ALL');

  useEffect(() => {
    async function fetchGlossary() {
      try {
        const res = await fetch('/api/glossary');
        if (res.ok) {
          const data = await res.json();
          setGlossary(data.length > 0 ? data : fallbackGlossary);
        } else {
          setGlossary(fallbackGlossary);
        }
      } catch (err) {
        console.error("Failed to load glossary from API, using fallbacks:", err);
        setGlossary(fallbackGlossary);
      } finally {
        setLoading(false);
      }
    }
    fetchGlossary();
  }, []);

  // Filter by search term and first letter
  const filteredGlossary = glossary.filter(item => {
    const matchesSearch = 
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLetter = 
      activeLetter === 'ALL' || 
      item.term.toUpperCase().startsWith(activeLetter);

    return matchesSearch && matchesLetter;
  });

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary-blue) 0%, #1a3a6b 100%)',
        borderBottom: '4px solid var(--accent-gold)',
        padding: '5rem 0 4rem 0',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="layout-container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(197,168,128,0.15)', border: '1px solid var(--accent-gold)', borderRadius: '50px', padding: '0.35rem 1rem', marginBottom: '1.5rem' }}>
            <BookOpen size={14} style={{ color: 'var(--accent-gold)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Legal Dictionary</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2 }}>
            Glossary of Revenue Law<br />
            <span style={{ color: 'var(--accent-gold)' }}>Rajasthan Land Terms</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            A dictionary of vernacular revenue terms, administrative titles, and legal definitions used in state proceedings.
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Filter and Search Section */}
        <div style={{
          background: 'white',
          border: '1px solid var(--border-color)',
          borderRadius: '10px',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '3rem'
        }}>
          {/* Search Input */}
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <input 
              type="text" 
              placeholder="Search legal terms or definition keywords..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
              style={{
                width: '100%',
                padding: '0.85rem 1rem 0.85rem 2.75rem',
                fontSize: '1rem',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                outline: 'none'
              }}
            />
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          </div>

          {/* Alphabet Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', justifyContent: 'center' }}>
            <button
              onClick={() => setActiveLetter('ALL')}
              style={{
                padding: '0.4rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                borderRadius: '4px',
                border: '1px solid',
                borderColor: activeLetter === 'ALL' ? 'var(--primary-blue)' : 'var(--border-color)',
                backgroundColor: activeLetter === 'ALL' ? 'var(--primary-blue)' : 'white',
                color: activeLetter === 'ALL' ? 'white' : 'var(--text-dark)',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
            >
              ALL
            </button>
            {alphabet.map((l) => (
              <button
                key={l}
                onClick={() => setActiveLetter(l)}
                style={{
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  borderRadius: '4px',
                  border: '1px solid',
                  borderColor: activeLetter === l ? 'var(--primary-blue)' : 'var(--border-color)',
                  backgroundColor: activeLetter === l ? 'var(--primary-blue)' : 'white',
                  color: activeLetter === l ? 'white' : 'var(--text-dark)',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div className="spinner" style={{ margin: '0 auto 1.5rem auto' }}></div>
            <p>Loading revenue dictionary terms...</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '850px', margin: '0 auto' }}>
            {filteredGlossary.map((item, idx) => (
              <div key={idx} style={{
                background: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-sm)',
                borderLeft: '4px solid var(--accent-gold)'
              }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.75rem' }}>{item.term}</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-dark)', lineHeight: 1.65, margin: 0 }}>{item.definition}</p>
              </div>
            ))}
            {filteredGlossary.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '3rem',
                background: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-muted)'
              }}>
                <HelpCircle size={32} style={{ color: 'var(--accent-gold)', marginBottom: '0.75rem' }} />
                <p style={{ margin: 0, fontSize: '0.95rem' }}>No dictionary terms match the selected filters.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
