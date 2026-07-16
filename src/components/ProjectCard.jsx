import React from 'react';
import { ExternalLink, Github, Folder } from 'lucide-react';

export default function ProjectCard({ title, description, tags, githubLink, liveLink, image }) {
  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', position: 'relative' }}>
      {image && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2,
          zIndex: 0
        }} />
      )}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center' }}>
            <Folder size={32} />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {githubLink && (
              <a href={githubLink} target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub Code">
                <Github size={20} />
              </a>
            )}
            {liveLink && (
              <a href={liveLink} target="_blank" rel="noopener noreferrer" className="social-link" title="Live Demo">
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>

        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--text-primary)' }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', flex: '1', marginBottom: '20px' }}>
        {description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
        {tags.map((tag, index) => (
          <span
            key={index}
            style={{
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-secondary)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      </div>
    </div>
  );
}
