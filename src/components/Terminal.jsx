import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Minimize2 } from 'lucide-react';

export default function Terminal({ isOpen, onClose, isLightTheme, toggleTheme }) {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to Sailendra\'s interactive IT console.' },
    { type: 'output', text: 'Type "help" to see available commands. Try "neofetch" for academic profile info.' },
  ]);
  const [input, setInput] = useState('');
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  // Focus terminal input
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    
    const cmd = input.trim();
    if (!cmd) return;

    const newHistory = [...history, { type: 'input', text: cmd }];
    const cmdLower = cmd.toLowerCase();
    const parts = cmdLower.split(' ');
    const primaryCmd = parts[0];

    let output = '';

    switch (primaryCmd) {
      case 'help':
        output = `Available Commands:
  help      - Display this list
  neofetch  - Display system & academic status info
  about     - Brief bio of Sailendra
  skills    - List core Information Technology skills
  projects  - List main projects
  subnet    - Perform CLI Subnet Calculation. Format: subnet [ip]/[prefix]
  theme     - Toggle light/dark theme
  clear     - Clear screen
  contact   - Get contact methods
  sudo      - Admin mode`;
        break;
      
      case 'neofetch':
        output = `
   /\\_/\\      sailendra@hwic-portfolio
  ( o.o )     -------------------------
   > ^ <      Name: Sailendra Bhattarai
              OS: React + Vite (Browser)
              Kernel: BIT — Purbanchal University
              Host: Himalayan Whitehouse Int'l College
              Location: Lokanthali, Bhaktapur, Nepal
              Semester: 6th Semester (Final Year)
              Stack: Python, Django, PHP, Java, C, HTML/CSS
              GitHub: MrSailendraBhattarai (16 repos)
              Email: bhattaraisujan9825@gmail.com
              Theme: ${isLightTheme ? 'Light Glass' : 'Cyber Slate Dark'}
        `;
        break;

      case 'about':
        output = 'Sailendra Bhattarai is a passionate B.I.T student at Himalayan Whitehouse International College (Purbanchal University), Putalisadak, Kathmandu, Nepal. He specializes in Python & Django backend development, PHP web projects, and has hands-on experience with C and Java. He has earned certifications from SkillShikshya, HackerRank and New IT Venture.';
        break;

      case 'skills':
        output = `Technical Stack:
  * Frontend: HTML5, CSS3, Bootstrap, JavaScript, SCSS
  * Backend: Python, Django Framework, PHP
  * Languages: Java, C Programming
  * Databases: MySQL, SQLite
  * Tools: Git, GitHub, VS Code, Adobe XD`;
        break;

      case 'projects':
        output = `GitHub Projects (github.com/MrSailendraBhattarai):
  1. Hospital Management System — PHP, MySQL
  2. Bakery Management System — C Language
  3. Attendance Management System — Java
  4. Django Tweet App — Python, Django
  5. Django Todo App — Python, Django
  6. WhiteHouse Innovators Website — HTML, Bootstrap
  7. Python Projects Collection — Python
  8. Web Technology Training — HTML, CSS, SCSS
  Type 'open github' to visit the full profile.`;
        break;

      case 'subnet':
        if (parts.length < 2) {
          output = 'Error: Subnet calculator needs an argument. Format: subnet [ip]/[prefix] (e.g. subnet 192.168.1.1/24)';
        } else {
          const arg = parts[1];
          const subParts = arg.split('/');
          if (subParts.length !== 2) {
            output = 'Error: Invalid subnet parameter. Format: [ip]/[prefix] (e.g., 10.0.0.1/8)';
          } else {
            const subnetIp = subParts[0];
            const prefix = parseInt(subParts[1], 10);
            
            // Basic verification
            const ipParts = subnetIp.split('.');
            const isIpValid = ipParts.length === 4 && ipParts.every(numStr => {
              const num = parseInt(numStr, 10);
              return !isNaN(num) && num >= 0 && num <= 255;
            });

            if (!isIpValid || isNaN(prefix) || prefix < 0 || prefix > 32) {
              output = 'Error: Invalid IP Address or CIDR mask range (0-32).';
            } else {
              // Calculate details
              const maskOctets = [];
              for (let i = 0; i < 4; i++) {
                let bits = Math.min(Math.max(prefix - i * 8, 0), 8);
                maskOctets.push(256 - Math.pow(2, 8 - bits));
              }
              const ipOctets = ipParts.map(o => parseInt(o, 10));
              const netOctets = ipOctets.map((o, idx) => o & maskOctets[idx]);
              const wildcardOctets = maskOctets.map(o => 255 - o);
              const broadOctets = netOctets.map((o, idx) => o | wildcardOctets[idx]);
              const totalHosts = prefix === 32 ? 1 : prefix === 31 ? 2 : Math.pow(2, 32 - prefix) - 2;

              output = `CLI Subnetting Report for ${subnetIp}/${prefix}:
  * Subnet Mask:      ${maskOctets.join('.')}
  * Network Address:  ${netOctets.join('.')}
  * Broadcast Address:${broadOctets.join('.')}
  * Wildcard Mask:    ${wildcardOctets.join('.')}
  * Usable Hosts:     ${totalHosts.toLocaleString()}`;
            }
          }
        }
        break;

      case 'theme':
        toggleTheme();
        output = `Theme switched to: ${!isLightTheme ? 'Light Glass' : 'Slate Dark'}`;
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'contact':
        output = `Get in touch:
  * Email:    bhattaraisujan9825@gmail.com
  * GitHub:   github.com/MrSailendraBhattarai
  * LinkedIn: linkedin.com/in/sailendra-bhattarai-05a225239
  * Live Portfolio: sailendrabhattarai.vercel.app`;
        break;

      case 'open github':
        window.open('https://github.com/MrSailendraBhattarai', '_blank');
        output = 'Opening GitHub profile in new tab...';
        break;

      case 'sudo':
        output = 'Sudo mode requested. User is not in the sudoers file. This incident will be reported.';
        break;

      default:
        output = `Command not recognized: "${primaryCmd}". Type "help" for a list of commands.`;
    }

    setHistory([...newHistory, { type: 'output', text: output }]);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className={`terminal-drawer ${isOpen ? 'open' : ''}`} onClick={handleContainerClick}>
      <div className="terminal-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TerminalIcon size={16} />
          <span>Interactive IT Shell (v1.0.0)</span>
        </div>
        <div className="terminal-dots" style={{ alignItems: 'center' }}>
          <div className="terminal-dot dot-green"></div>
          <div className="terminal-dot dot-yellow"></div>
          <button className="terminal-close-btn" onClick={onClose} style={{ marginLeft: '10px' }}>
            <Minimize2 size={16} />
          </button>
        </div>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        <div className="terminal-welcome">
          <div>============================================================</div>
          <div>       _   _   _____    _____ _               _ _       </div>
          <div>      | | | | |  __ \\  / ____| |             | | |      </div>
          <div>      | | | | | |__) | | (___ | |__   ___  | | |      </div>
          <div>      | | | | |  ___/   \\___ \\| '_ \\ / _ \\ | | |      </div>
          <div>      | |_| | | |       ____) | | | |  __/ | | |      </div>
          <div>       \\___/  |_|      |_____/|_| |_|\\___| |_|_|      </div>
          <div>============================================================</div>
        </div>
        {history.map((item, index) => (
          <div key={index} className="terminal-history-item">
            {item.type === 'input' ? (
              <div className="terminal-history-cmd">
                <span>guest@sailendra-portfolio:~$</span>
                <span>{item.text}</span>
              </div>
            ) : (
              <div className="terminal-history-output">{item.text}</div>
            )}
          </div>
        ))}
        <div className="terminal-input-line">
          <span className="terminal-prompt-prefix">guest@sailendra-portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-cmd-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            autoComplete="off"
            spellCheck="false"
          />
          <span className="terminal-cursor"></span>
        </div>
      </div>
    </div>
  );
}
