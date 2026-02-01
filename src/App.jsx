import { useState, useEffect } from 'react';
import IconCard from './components/IconCard';
import { searchIcons, setDomainKey, getDomainKey } from './services/iconApi';
import { Search, Info, Loader2, X, Settings, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [query, setQuery] = useState('apple');
  const [icons, setIcons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ start: 0, next: false });

  const fetchIcons = async (searchQuery, start = 0) => {
    if (!getDomainKey()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await searchIcons(searchQuery, 20, start);
      if (start === 0) {
        setIcons(data.icons || []);
      } else {
        setIcons(prev => [...prev, ...(data.icons || [])]);
      }
      setPagination({
        start: data.start + data.limit,
        next: data.next
      });
    } catch (err) {
      setError(err.message || 'Error loading icons. Please check your domain key and whitelist.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIcons('apple');

    // Add Cmd+K / Ctrl+K listener
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const input = document.getElementById('global-search-input');
        if (input) input.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchIcons(query, 0);
    }
  };

  return (
    <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Premium Search Header */}
      <header style={{
        padding: '100px 60px 80px',
        borderBottom: '1px solid var(--border-light)',
        textAlign: 'center'
      }}>
        <div style={{ width: '100%', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '900',
            letterSpacing: '-0.04em',
            marginBottom: '4px',
            color: 'var(--primary)'
          }}>
            iconfinder
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '1.1rem', fontWeight: '500' }}>
            Beautiful, production-ready icons for your next project.
          </p>

          <form onSubmit={handleSearch} style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            <input
              id="global-search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search icons... (⌘K)"
              className="input-premium"
              style={{ paddingLeft: '56px', fontSize: '1.1rem' }}
            />
            <Search
              style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }}
              color="var(--text-muted)"
              size={22}
            />
            <button
              type="submit"
              className="btn-premium"
              style={{
                position: 'absolute',
                right: '8px',
                top: '8px',
                bottom: '8px',
                padding: '0 20px',
                borderRadius: '8px'
              }}
            >
              Search
            </button>
          </form>
        </div>
      </header>

      <main className="container" style={{ flex: 1 }}>
        {error && (
          <div style={{
            margin: '40px',
            padding: '20px 24px',
            background: '#fef2f2',
            color: '#991b1b',
            borderRadius: '12px',
            border: '1px solid #fee2e2',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.95rem'
          }}>
            <Info size={20} /> {error}
          </div>
        )}

        <div className="icon-grid" style={{ borderLeft: '1px solid var(--border-light)', borderTop: '1px solid var(--border-light)' }}>
          {icons.map((icon, index) => (
            <IconCard key={`${icon.id}-${index}`} icon={icon} />
          ))}
        </div>

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
            <Loader2 className="animate-spin" size={32} color="var(--accent)" />
          </div>
        )}

        {!loading && icons.length > 0 && pagination.next && (
          <div style={{ textAlign: 'center', padding: '100px 40px', borderTop: '1px solid var(--border-light)' }}>
            <button
              onClick={() => fetchIcons(query, pagination.start)}
              className="btn-premium"
              style={{ background: 'white', color: 'var(--primary)', border: '1px solid var(--border-subtle)' }}
            >
              Load more results <ArrowRight size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
            </button>
          </div>
        )}

        {!loading && icons.length === 0 && !error && (
          <div style={{ textAlign: 'center', padding: '120px 40px', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.25rem', fontWeight: '500' }}>No icons found for "{query}"</p>
            <p style={{ marginTop: '8px' }}>Try exploring other categories or keywords.</p>
          </div>
        )}
      </main>

      <footer style={{
        padding: '30px 60px',
        borderTop: '1px solid var(--border-light)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--bg-soft)'
      }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: '500' }}>
          iconfinder &copy; 2026. Powered by svgapi.com
        </p>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)', padding: '4px 8px', borderRadius: '6px', background: 'white' }}>
            Press <kbd style={{ fontStyle: 'normal', fontWeight: '800' }}>⌘ K</kbd> to search
          </span>
        </div>
      </footer>

      <style>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default App;
