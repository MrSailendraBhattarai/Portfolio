import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Code, Database, Server, Mail, Github,
  Linkedin, ArrowUpRight, Award, Send, CheckCircle,
  Globe, MapPin, GraduationCap, Briefcase
} from 'lucide-react';

import ProjectCard from './components/ProjectCard';

const BASE = '';

function GalleryTile({ img, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        height: '220px', borderRadius: '14px', overflow: 'hidden',
        cursor: 'pointer', boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--border-color)',
      }}
    >
      <img
        src={img.src}
        alt={img.alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
        onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
      />
    </div>
  );
}

function FolderCard({ label, count: _count, cover, accent, onClick }) {
  return (
    <div className="gallery-folder-card" onClick={onClick}>
      <div className="gallery-folder-cover">
        {cover
          ? <img src={cover} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div style={{ width: '100%', height: '100%', background: 'var(--bg-tertiary)' }} />}
        <div className="gallery-folder-overlay" />
        {/* folder tab */}
        <div className="gallery-folder-tab" style={{ background: accent }} />
      </div>
      <div className="gallery-folder-info">
        <span className="gallery-folder-name">{label}</span>
      </div>
    </div>
  );
}

const titles = ['Python & Django Developer', 'BIT Student @ Himalayan WhiteHouse International College', 'Web Developer', 'IT Enthusiast'];

export default function App() {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [projectFilter, setProjectFilter] = useState('all');
  const [openFolder, setOpenFolder] = useState(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [typedText, setTypedText] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Typewriter effect
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = titles[titleIndex];
    const delay = isDeleting ? 60 : 120;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(current.substring(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        } else {
          setCharIndex(c => c + 1);
        }
      } else {
        setTypedText(current.substring(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setTitleIndex(i => (i + 1) % titles.length);
          setCharIndex(0);
        } else {
          setCharIndex(c => c - 1);
        }
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, titleIndex]);

  // Projects with real images
  const projectsData = [
    {
      title: 'Event Management System (Event Sathi)',
      description: 'A comprehensive event management platform built as a major project. Handles event ticketing, registration, and management.',
      tags: ['PHP', 'MySQL', 'Web', 'Bootstrap'],
      category: 'web',
      image: 'https://github.com/user-attachments/assets/1a2c8b89-9c61-4227-bc46-5b32278138d1',
      githubLink: 'https://github.com/MrSailendraBhattarai/Event-Sathi',
    },
    {
      title: 'Hospital Management System',
      description: 'A full-stack hospital management system built with PHP. Handles patient records, appointments, doctor management and billing. Academic project (Project-V).',
      tags: ['PHP', 'MySQL', 'HTML', 'CSS', 'Bootstrap'],
      category: 'web',
      image: `${BASE}/p2.webp`,
      githubLink: 'https://github.com/MrSailendraBhattarai/The-Hospital-Management-System-PHP',
    },
    {
      title: 'WhiteHouse Innovators Club Website',
      description: 'Built the official website for WhiteHouse Innovators IT club during a Frontend Hack Fest. Responsive design with Bootstrap.',
      tags: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
      category: 'web',
      image: `${BASE}/whitehouseinnovator.gif`,
      githubLink: 'https://github.com/MrSailendraBhattarai/WhiteHouse-Innovators-Website',
    },
    {
      title: 'Django Tweet App',
      description: 'A Twitter-like micro-blogging web app built with Python and Django. Supports user authentication, posting tweets, and timeline views.',
      tags: ['Python', 'Django', 'SQLite', 'Bootstrap'],
      category: 'web',
      image: `${BASE}/tweet.png`,
      githubLink: 'https://github.com/MrSailendraBhattarai/Django-Tweet',
    },
    {
      title: 'Django Todo App',
      description: 'A simple but elegant todo web application using Python Django. Allows creating, completing and deleting daily tasks with persistence.',
      tags: ['Python', 'Django', 'SQLite', 'HTML/CSS'],
      category: 'web',
      image: `${BASE}/todoo.gif`,
      githubLink: 'https://github.com/MrSailendraBhattarai/Django-Todo',
    },
    {
      title: 'Python Projects Collection',
      description: 'A curated collection of Python mini-projects and scripts covering algorithms, data manipulation, automation, and scripting basics.',
      tags: ['Python', 'Algorithms', 'Scripting'],
      category: 'python',
      image: `${BASE}/p1.webp`,
      githubLink: 'https://github.com/MrSailendraBhattarai/Python_Projects',
    },
    {
      title: 'Attendance Management System',
      description: 'A Java-based attendance tracking system for managing student attendance records with GUI. Demonstrates OOP principles.',
      tags: ['Java', 'OOP', 'GUI', 'Data Structures'],
      category: 'systems',
      image: null,
      githubLink: 'https://github.com/MrSailendraBhattarai/Attendance-Management-System-in-Java',
    },
    {
      title: 'Bakery Management System',
      description: 'A C-language bakery management application handling inventory, orders, and sales tracking with file-based data persistence.',
      tags: ['C', 'File I/O', 'Structs', 'CLI'],
      category: 'systems',
      image: null,
      githubLink: 'https://github.com/MrSailendraBhattarai/Bakery-Management-System',
    },
    {
      title: 'Web Technology Training',
      description: 'Hands-on training exercises covering HTML, CSS, Bootstrap and SCSS including responsive layouts and component demos.',
      tags: ['HTML', 'CSS', 'Bootstrap', 'SCSS'],
      category: 'web',
      image: null,
      githubLink: 'https://github.com/MrSailendraBhattarai/Web-Technology-Training',
    },
  ];

  // Certificates with real images
  const certificatesData = [
    {
      title: 'Python Django Diploma',
      issuer: 'SkillShikshya',
      description: 'Completed a comprehensive Python Django Diploma Course covering backend web development, ORM, authentication and REST APIs.',
      tags: ['Python', 'Django'],
      image: `${BASE}/skillshikshya.jpg`,
      link: 'https://certification.skillshikshya.com/search?query=PDDC1580',
      color: 'var(--accent-cyan)'
    },
    {
      title: '100 Days of Learning Challenge',
      issuer: 'SkillShikshya × VritTech',
      description: 'Certificate of Achievement for successfully completing the 100 Days of Learning Challenge with consistency, discipline, and self-motivation — demonstrating commitment to growth and continuous improvement.',
      tags: ['Learning', 'Consistency', 'Self-Development'],
      image: `${BASE}/100daycompletion.jpg`,
      link: '#',
      color: '#3b82f6'
    },
    {
      title: 'Python Training Certificate',
      issuer: 'HackerRank',
      description: 'Successfully completed Python language proficiency certification on HackerRank, demonstrating core language and data structure skills.',
      tags: ['Python'],
      image: `${BASE}/hackerrank.jpeg`,
      link: 'https://www.hackerrank.com/certificates/302822585e16',
      color: 'var(--accent-green)'
    },
    {
      title: 'Python Workshop Certificate',
      issuer: 'New IT Venture',
      description: 'Attended and completed a hands-on Python workshop organized by New IT Venture, focused on practical scripting and project building.',
      tags: ['Python', 'Workshop'],
      image: `${BASE}/newitventure.jpg`,
      link: '#',
      color: 'var(--accent-purple)'
    },
    {
      title: 'AI Training Certificate',
      issuer: 'Technology Channel',
      description: 'Successfully completed an AI training program covering machine learning fundamentals, neural networks and AI application development.',
      tags: ['AI', 'Machine Learning'],
      image: `${BASE}/technologychannel.jpg`,
      link: '#',
      color: '#f59e0b'
    },
  ];

  // Gallery Data
  const galleryImages = [
    // Events – HWIC college & hackathons
    { src: '/gallery/events/hwic_trio_1.jpg',          alt: 'At HWIC with teammates', category: 'events' },
    { src: '/gallery/events/hwic_trio_2.jpg',          alt: 'At HWIC with teammates', category: 'events' },
    { src: '/gallery/events/hwic_class.jpg',           alt: 'BIT Class Group Photo – HWIC', category: 'events' },
    { src: '/gallery/events/hwic_group.jpg',           alt: 'Group photo outside HWIC', category: 'events' },
    { src: '/gallery/events/hwic_event_1.jpg',         alt: 'HWIC College Event', category: 'events' },
    { src: '/gallery/events/hwic_event_2.jpg',         alt: 'HWIC College Event', category: 'events' },
    { src: '/gallery/events/hwic_event_3.jpg',         alt: 'HWIC College Event', category: 'events' },
    { src: '/gallery/events/hwic_event_4.jpg',         alt: 'HWIC College Event', category: 'events' },
    { src: '/gallery/events/hwic_event_5.jpg',         alt: 'HWIC College Event', category: 'events' },
    { src: '/gallery/graduation/graduation_day.jpg',   alt: 'Graduation Day', category: 'graduation' },
    { src: '/gallery/graduation/20260706_150413.jpg',  alt: 'Graduation Day', category: 'graduation' },
    { src: '/gallery/graduation/20260706_150420.jpg',  alt: 'Graduation Day', category: 'graduation' },
    { src: '/gallery/graduation/20260706_150517.jpg',  alt: 'Graduation Day', category: 'graduation' },
    { src: '/gallery/graduation/20260706_150519.jpg',  alt: 'Graduation Day', category: 'graduation' },
    // Academic – thesis book covers & spines
    { src: '/gallery/academic/thesis_book_1.jpeg',     alt: 'Event Sathi Major Project Report', category: 'academic' },
    { src: '/gallery/academic/thesis_book_2.jpeg',     alt: 'Event Sathi Major Project Report', category: 'academic' },
    { src: '/gallery/academic/thesis_book_3.jpeg',     alt: 'Event Sathi Major Project Report', category: 'academic' },
    { src: '/gallery/academic/thesis_book_4.jpeg',     alt: 'Event Sathi Major Project Report', category: 'academic' },
    { src: '/gallery/academic/thesis_book_5.jpeg',     alt: 'Event Sathi Major Project Report', category: 'academic' },
    { src: '/gallery/academic/thesis_spine.jpeg',      alt: 'Event Sathi Thesis – Spine', category: 'academic' },
    { src: '/gallery/academic/thesis_spine_2.jpeg',    alt: 'Event Sathi Thesis – Spine', category: 'academic' },
  ];

  // Academic timeline
  const semestersData = [
    {
      semester: 'Semester 1 & 2',
      title: 'Computing Foundations',
      description: 'C programming basics, computer architecture, digital logic, mathematics for computing and introduction to operating systems.',
      badge: 'First Year'
    },
    {
      semester: 'Semester 3 & 4',
      title: 'Data Structures, OOP & Databases',
      description: 'Java OOP, Data Structures and Algorithms, Relational Database design with SQL, PHP web development basics.',
      badge: 'Second Year'
    },
    {
      semester: 'Semester 5',
      title: 'Web Technologies & Networking',
      description: 'Advanced HTML/CSS/Bootstrap, JavaScript, Python & Django backend, TCP/IP networking, system administration.',
      badge: 'Third Year'
    },
    {
      semester: 'Semester 6',
      title: 'Software Engineering & Minor Project',
      description: 'Software design patterns, testing, project management methodologies, and minor project development.',
      badge: 'Third Year'
    },
    {
      semester: 'Semester 7',
      title: 'Advanced Topics & Electives',
      description: 'Artificial Intelligence, Cloud Computing, E-Commerce technologies and research methodology.',
      badge: 'Fourth Year'
    },
    {
      semester: 'Semester 8',
      title: 'Internship & Final Deliverables',
      description: 'Industry placement, professional practice, and final year capstone project development.',
      badge: 'Graduation'
    }
  ];

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
    if (!isLightTheme) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSubmitted(true);
    setContactForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setContactSubmitted(false), 5000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'timeline', 'skills', 'projects', 'gallery', 'certificates', 'contact'];
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = projectFilter === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === projectFilter);


  return (
    <div>
      {/* ── NAVIGATION ── */}
      <nav className="navbar">
        <div className="container nav-container">
          <a href="#home" className="logo">Sailendra</a>
          <ul className="nav-menu">
            {['about', 'timeline', 'skills', 'projects', 'gallery', 'certificates', 'contact'].map(section => (
              <li key={section}>
                <a href={`#${section}`} className={`nav-link ${activeSection === section ? 'active' : ''}`}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
            <li>
              <a href={`${BASE}/MyCV.pdf`} target="_blank" rel="noopener noreferrer"
                className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '14px' }}>
                View CV
              </a>
            </li>
            <li>
              <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
                {isLightTheme ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="container">
        <div className="hero-wrapper">
          <div className="hero-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <MapPin size={16} style={{ color: 'var(--accent-cyan)' }} />
              <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Lokanthali, Bhaktapur, Nepal</span>
            </div>
            <span className="hero-subtitle">Hi, I'm</span>
            <h1 className="hero-title">
              <span className="gradient-text">Sailendra Bhattarai</span>
            </h1>
            <div style={{
              fontSize: '22px', fontWeight: 600, color: 'var(--text-secondary)',
              minHeight: '32px', fontFamily: 'var(--font-mono)', marginBottom: '8px'
            }}>
              <span>{typedText}</span>
              <span className="terminal-cursor" style={{ width: '10px', height: '22px' }}></span>
            </div>
            <p className="hero-description">
              A passionate B.I.T student specializing in{' '}
              <strong style={{ color: 'var(--accent-cyan)' }}>Python & Django</strong>.
              Currently pursuing Bachelor in Information Technology at{' '}
              <strong>Himalayan Whitehouse International College</strong>, Purbanchal University.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">View Projects</a>
              <a href="https://github.com/MrSailendraBhattarai" target="_blank" rel="noopener noreferrer"
                className="btn btn-secondary">
                <Github size={18} /> GitHub Profile
              </a>
              <a href="https://www.linkedin.com/in/sailendra-bhattarai-05a225239" target="_blank" rel="noopener noreferrer"
                className="btn btn-secondary">
                <Linkedin size={18} /> LinkedIn Profile
              </a>
            </div>
            {/* Stats */}
            <div style={{ display: 'flex', gap: '24px', marginTop: '24px', flexWrap: 'wrap' }}>
              {[
                { label: 'GitHub Repos', value: '16+' },
                { label: 'Projects Built', value: '10+' },
                { label: 'Certificates', value: '5' },
                { label: 'Years Learning', value: '4+' },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div className="gradient-text" style={{ fontSize: '26px', fontWeight: 800 }}>{stat.value}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Photo */}
          <div className="hero-visual">
            <div className="cube-glow"></div>
            <div style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <div style={{
                position: 'absolute',
                inset: '-3px',
                borderRadius: '50%',
                background: 'var(--gradient-primary)',
                padding: '3px',
                zIndex: 0,
              }}></div>
              <img
                src={`${BASE}/profile.png`}
                alt="Sailendra Bhattarai"
                style={{
                  width: '280px',
                  height: '280px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '4px solid var(--bg-primary)',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: 'var(--shadow-glow)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: 'var(--bg-secondary)', transition: 'background-color var(--transition-normal)' }}>
        <div className="container">
          <div className="section-header">
            <h2>About Me</h2>
            <p>A dedicated web developer bridging frontend and backend technologies.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '48px', alignItems: 'center' }}>
            {/* About photo */}
            <div>
              <img
                src={`${BASE}/p3.webp`}
                alt="Sailendra Bhattarai About"
                style={{
                  width: '100%',
                  borderRadius: '20px',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--border-color)',
                }}
              />
            </div>
            {/* About text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.8' }}>
                I'm a dedicated web developer with a strong foundation in both frontend and backend technologies.
                My journey in tech began with a curiosity about how things work on the internet, which led me to
                pursue a degree in Information Technology.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.8' }}>
                Currently, I'm focused on building scalable web applications using{' '}
                <strong style={{ color: 'var(--text-primary)' }}>Django</strong> and exploring modern frontend frameworks.
                I believe in writing clean, maintainable code and creating user-friendly interfaces that solve real-world problems.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '8px' }}>
                {[
                  { icon: <GraduationCap size={18} />, label: 'Education', value: 'BIT — Purbanchal University' },
                  { icon: <Briefcase size={18} />, label: 'Experience', value: '2+ Years' },
                  { icon: <Globe size={18} />, label: 'College', value: 'Himalayan WhiteHouse International College, Putalisadak, Kathmandu' },
                  { icon: <Award size={18} />, label: 'Projects', value: '10+ Completed' },
                ].map((item, i) => (
                  <div key={i} className="glass-panel" style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACADEMIC TIMELINE ── */}
      <section id="timeline">
        <div className="container">
          <div className="section-header">
            <h2>Academic Timeline</h2>
            <p>Milestones across my BIT journey at Himalayan Whitehouse International College.</p>
          </div>
          <div className="timeline">
            {semestersData.map((item, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="glass-panel timeline-content">
                  <span className="timeline-semester">{item.semester}</span>
                  <h3 style={{ fontSize: '18px', margin: '8px 0', color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>{item.description}</p>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>{item.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ background: 'var(--bg-secondary)', transition: 'background-color var(--transition-normal)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Skills & Expertise</h2>
            <p>Technical abilities gained through academics, projects and self-learning.</p>
          </div>
          <div className="skills-grid">
            <div className="glass-panel skill-card">
              <h3><Code size={20} style={{ color: 'var(--accent-cyan)' }} /> Frontend</h3>
              <div className="skill-list">
                {[
                  { name: 'HTML5 & CSS3', level: 90 },
                  { name: 'Bootstrap', level: 85 },
                  { name: 'JavaScript (ES6)', level: 70 },
                  { name: 'SCSS/Sass', level: 65 },
                  { name: 'Responsive Design', level: 88 },
                ].map((s, i) => (
                  <div className="skill-item" key={i}>
                    <div className="skill-info"><span>{s.name}</span><span>{s.level}%</span></div>
                    <div className="skill-bar-container"><div className="skill-bar" style={{ width: `${s.level}%` }}></div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel skill-card">
              <h3><Server size={20} style={{ color: 'var(--accent-purple)' }} /> Backend</h3>
              <div className="skill-list">
                {[
                  { name: 'Python', level: 85 },
                  { name: 'Django Framework', level: 80 },
                  { name: 'PHP', level: 70 },
                  { name: 'Java', level: 65 },
                  { name: 'C Programming', level: 70 },
                ].map((s, i) => (
                  <div className="skill-item" key={i}>
                    <div className="skill-info"><span>{s.name}</span><span>{s.level}%</span></div>
                    <div className="skill-bar-container"><div className="skill-bar" style={{ width: `${s.level}%` }}></div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel skill-card">
              <h3><Database size={20} style={{ color: 'var(--accent-cyan)' }} /> Tools & Databases</h3>
              <div className="skill-list">
                {[
                  { name: 'Git & GitHub', level: 80 },
                  { name: 'MySQL / SQLite', level: 78 },
                  { name: 'Adobe XD', level: 60 },
                  { name: 'VS Code', level: 95 },
                  { name: 'Linux Basics', level: 65 },
                ].map((s, i) => (
                  <div className="skill-item" key={i}>
                    <div className="skill-info"><span>{s.name}</span><span>{s.level}%</span></div>
                    <div className="skill-bar-container"><div className="skill-bar" style={{ width: `${s.level}%` }}></div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects">
        <div className="container">
          <div className="section-header">
            <h2>Featured Projects</h2>
            <p>Real projects from my GitHub — academic work, personal practice, and hackathon builds.</p>
          </div>
          <div className="projects-filter">
            {[
              { key: 'all', label: 'All' },
              { key: 'web', label: 'Web Dev' },
              { key: 'python', label: 'Python' },
              { key: 'systems', label: 'Systems' },
            ].map(f => (
              <button key={f.key} onClick={() => setProjectFilter(f.key)}
                className={`filter-btn ${projectFilter === f.key ? 'active' : ''}`}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="projects-grid">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={idx} {...project} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <a href="https://github.com/MrSailendraBhattarai" target="_blank" rel="noopener noreferrer"
              className="btn btn-secondary">
              <Github size={18} /> View All 16 Repos on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ── */}
      <section id="gallery">
        <div className="container">
          <div className="section-header">
            <h2>Photo Gallery</h2>
            <p>Moments from my academic journey, hackathons, and projects.</p>
          </div>

          {openFolder === null ? (
            /* ── FOLDER VIEW ── */
            <div className="gallery-folders-grid">
              {[
                { key: 'academic',   label: 'Academic',            accent: 'var(--accent-cyan)'   },
                { key: 'events',     label: 'Events & Hackathons', accent: 'var(--accent-purple)' },
                { key: 'graduation', label: 'Graduation',          accent: '#f59e0b'               },
              ].map(({ key, label, accent }) => {
                const imgs = galleryImages.filter(i => i.category === key);
                return (
                  <FolderCard
                    key={key}
                    label={label}
                    count={imgs.length}
                    cover={imgs[0]?.src}
                    accent={accent}
                    onClick={() => setOpenFolder(key)}
                  />
                );
              })}
            </div>
          ) : (
            /* ── OPEN FOLDER VIEW ── */
            <>
              <button
                className="gallery-back-btn"
                onClick={() => setOpenFolder(null)}
              >
                ← Back to folders
              </button>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
                {galleryImages
                  .filter(i => i.category === openFolder)
                  .map((img, idx) => (
                    <GalleryTile key={idx} img={img} onClick={() => setSelectedImage(img.src)} />
                  ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── CERTIFICATES ── */}
      <section id="certificates" style={{ background: 'var(--bg-secondary)', transition: 'background-color var(--transition-normal)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Certificates & Achievements</h2>
            <p>Verified credentials earned through training, workshops and online platforms.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {certificatesData.map((cert, idx) => (
              <div key={idx} className="glass-panel" style={{ overflow: 'hidden' }}>
                <div style={{ height: '200px', overflow: 'hidden', borderBottom: '1px solid var(--border-color)' }}>
                  <img
                    src={cert.image}
                    alt={cert.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    background: `${cert.color}22`, color: cert.color,
                    padding: '4px 12px', borderRadius: '20px',
                    fontSize: '12px', fontWeight: 700, marginBottom: '12px',
                    border: `1px solid ${cert.color}44`
                  }}>
                    <Award size={12} /> {cert.issuer}
                  </div>
                  <h3 style={{ fontSize: '17px', marginBottom: '8px' }}>{cert.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '14px', lineHeight: '1.6' }}>{cert.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                    {cert.tags.map((tag, i) => (
                      <span key={i} style={{
                        padding: '3px 10px', fontSize: '12px', borderRadius: '20px',
                        background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
                        color: 'var(--text-secondary)'
                      }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    {cert.link !== '#' && (
                      <a href={cert.link} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: cert.color, textDecoration: 'none' }}>
                        Verify Certificate <ArrowUpRight size={14} />
                      </a>
                    )}
                    <button onClick={() => setSelectedCert(cert.image)}
                      style={{ background: 'transparent', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: cert.color, textDecoration: 'none', cursor: 'pointer', padding: 0 }}>
                      View Certificate <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <div className="container">
          <div className="section-header">
            <h2>Get In Touch</h2>
            <p>I'm always open to discussing new projects, creative ideas or opportunities.</p>
          </div>
          <div className="contact-container">
            <div className="contact-info">
              <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h3 style={{ margin: 0, fontSize: '20px' }}>Let's Connect</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                  I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                </p>
                {[
                  { icon: <Mail size={20} />, label: 'Email', value: 'sailendrabhattaraiofficial@gmail.com', href: 'mailto:sailendrabhattaraiofficial@gmail.com' },
                  { icon: <Github size={20} />, label: 'GitHub', value: 'MrSailendraBhattarai', href: 'https://github.com/MrSailendraBhattarai' },
                  { icon: <Linkedin size={20} />, label: 'LinkedIn', value: 'sailendra-bhattarai', href: 'https://www.linkedin.com/in/sailendra-bhattarai-05a225239' },
                  { icon: <MapPin size={20} />, label: 'Location', value: 'Lokanthali, Bhaktapur, Nepal', href: null },
                ].map((item, i) => (
                  <div key={i} className="contact-item">
                    <div className="contact-icon-box">{item.icon}</div>
                    <div>
                      <h4 style={{ fontSize: '15px', margin: '0 0 4px 0' }}>{item.label}</h4>
                      {item.href ? (
                        <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel="noreferrer" style={{ fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                          {item.value}
                        </a>
                      ) : (
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={handleContactSubmit} className="glass-panel contact-form">
              {contactSubmitted ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '40px 0', color: 'var(--accent-green)', textAlign: 'center' }}>
                  <CheckCircle size={48} />
                  <h3 style={{ margin: 0, fontSize: '20px' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Thank you for reaching out. I'll get back to you soon!</p>
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" className="form-input" placeholder="Enter your name" required value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" className="form-input" placeholder="name@domain.com" required value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input type="text" id="subject" className="form-input" placeholder="Topic or purpose" value={contactForm.subject} onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" className="form-input" placeholder="Write your message..." required value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                    <Send size={18} /> Send Message
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="container">
          <div className="footer-socials">
            <a href="https://github.com/MrSailendraBhattarai" target="_blank" rel="noreferrer" className="social-link"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/sailendra-bhattarai-05a225239" target="_blank" rel="noreferrer" className="social-link"><Linkedin size={20} /></a>
            <a href="mailto:sailendrabhattaraiofficial@gmail.com" className="social-link"><Mail size={20} /></a>
          </div>
          <p style={{ fontSize: '14px' }}>
            &copy; {new Date().getFullYear()} Sailendra Bhattarai. BIT Student @ Himalayan WhiteHouse International College — Purbanchal University.
          </p>
        </div>
      </footer>

      {/* Certificate Modal */}
      {selectedCert && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
          backdropFilter: 'blur(5px)'
        }} onClick={() => setSelectedCert(null)}>
          <button style={{
            position: 'absolute', top: '24px', right: '24px',
            background: 'var(--bg-primary)', border: 'none', borderRadius: '50%',
            width: '40px', height: '40px', cursor: 'pointer', color: 'var(--text-primary)',
            fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-md)'
          }} onClick={() => setSelectedCert(null)}>✕</button>
          <img src={selectedCert} alt="Certificate" style={{ maxWidth: '90%', maxHeight: '90vh', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }} onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* Image Gallery Modal */}
      {selectedImage && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
          backdropFilter: 'blur(5px)'
        }} onClick={() => setSelectedImage(null)}>
          <button style={{
            position: 'absolute', top: '24px', right: '24px',
            background: 'var(--bg-primary)', border: 'none', borderRadius: '50%',
            width: '40px', height: '40px', cursor: 'pointer', color: 'var(--text-primary)',
            fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-md)'
          }} onClick={() => setSelectedImage(null)}>✕</button>
          <img src={selectedImage} alt="Gallery view" style={{ maxWidth: '90%', maxHeight: '90vh', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }} onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
