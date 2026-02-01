import React, { useState } from 'react';
import { Check, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const IconCard = ({ icon }) => {
 const [copied, setCopied] = useState(false);
 const [copiedImg, setCopiedImg] = useState(false);

 const displayUrl = icon.url || `https://cdn.svgapi.com/vector/${icon.id}.svg`;
 const imgTag = `<img src="${displayUrl}" alt="${icon.name}" />`;

 const copyToClipboard = async (text, setter) => {
  try {
   await navigator.clipboard.writeText(text);
   setter(true);
   setTimeout(() => setter(false), 2000);
  } catch (err) {
   console.error('Failed to copy!', err);
  }
 };

 return (
  <motion.div
   initial={{ opacity: 0, y: 10 }}
   animate={{ opacity: 1, y: 0 }}
   className="card-container"
  >
   <div style={{ marginBottom: '32px', height: '48px', display: 'flex', alignItems: 'center' }}>
    <div style={{
     width: '48px',
     height: '48px',
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
     background: 'var(--bg-soft)',
     borderRadius: '12px',
     padding: '10px'
    }}>
     <img
      src={displayUrl}
      alt={icon.title || icon.name || icon.slug || 'Icon'}
      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
     />
    </div>
   </div>

   <div style={{ marginBottom: '24px' }}>
    <h3 style={{
     fontSize: '1rem',
     fontWeight: '700',
     color: 'var(--text-main)',
     marginBottom: '6px',
     letterSpacing: '-0.01em'
    }}>
     {icon.title || icon.name || icon.slug || 'Untitled Icon'}
    </h3>
    <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: '400' }}>
     ID: {icon.id}
    </p>
   </div>

   <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <button
     onClick={() => copyToClipboard(displayUrl, setCopied)}
     className="btn-action"
    >
     {copied ? (
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981' }}>
       <Check size={14} /> Copied URL
      </span>
     ) : (
      <>Copy SVG URL <ArrowRight size={14} /></>
     )}
    </button>
    <button
     onClick={() => copyToClipboard(imgTag, setCopiedImg)}
     className="btn-action"
    >
     {copiedImg ? (
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981' }}>
       <Check size={14} /> Copied Tag
      </span>
     ) : (
      <>Copy Image Tag <ArrowRight size={14} /></>
     )}
    </button>
   </div>
  </motion.div>
 );
};

export default IconCard;
