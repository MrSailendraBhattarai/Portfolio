import React, { useState } from 'react';
import { Cpu, Network, RefreshCw } from 'lucide-react';

export default function SubnetCalculator() {
  const [ip, setIp] = useState('192.168.1.1');
  const [cidr, setCidr] = useState('24');
  const [error, setError] = useState('');
  const [results, setResults] = useState({
    ip: '192.168.1.1',
    cidr: '24',
    subnetMask: '255.255.255.0',
    networkAddress: '192.168.1.0',
    broadcastAddress: '192.168.1.255',
    usableRange: '192.168.1.1 - 192.168.1.254',
    totalHosts: '254',
    wildcardMask: '0.0.0.255',
  });

  const validateIp = (ipStr) => {
    const parts = ipStr.split('.');
    if (parts.length !== 4) return false;
    return parts.every((part) => {
      const num = parseInt(part, 10);
      return !isNaN(num) && num >= 0 && num <= 255 && part === num.toString();
    });
  };

  const calculateSubnet = (e) => {
    if (e) e.preventDefault();
    
    setError('');

    if (!validateIp(ip)) {
      setError('Invalid IPv4 address format. Use format xxx.xxx.xxx.xxx');
      return;
    }

    const cidrNum = parseInt(cidr, 10);
    if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
      setError('CIDR must be an integer between 0 and 32.');
      return;
    }

    const ipOctets = ip.split('.').map(num => parseInt(num, 10));

    // Calculate Subnet Mask
    const maskOctets = [];
    for (let i = 0; i < 4; i++) {
      let bits = Math.min(Math.max(cidrNum - i * 8, 0), 8);
      maskOctets.push(256 - Math.pow(2, 8 - bits));
    }
    const subnetMaskStr = maskOctets.join('.');

    // Calculate Network Address
    const networkOctets = ipOctets.map((octet, idx) => octet & maskOctets[idx]);
    const networkAddressStr = networkOctets.join('.');

    // Calculate Wildcard Mask
    const wildcardOctets = maskOctets.map(octet => 255 - octet);
    const wildcardMaskStr = wildcardOctets.join('.');

    // Calculate Broadcast Address
    const broadcastOctets = networkOctets.map((octet, idx) => octet | wildcardOctets[idx]);
    const broadcastAddressStr = broadcastOctets.join('.');

    // Calculate Total Usable Hosts & Ranges
    let totalHosts = 0;
    let rangeStr = '';

    if (cidrNum === 32) {
      totalHosts = 1;
      rangeStr = networkAddressStr;
    } else if (cidrNum === 31) {
      totalHosts = 2;
      rangeStr = `${networkAddressStr} - ${broadcastAddressStr}`;
    } else {
      totalHosts = Math.pow(2, 32 - cidrNum) - 2;
      
      const firstUsable = [...networkOctets];
      firstUsable[3] += 1;
      
      const lastUsable = [...broadcastOctets];
      lastUsable[3] -= 1;
      
      rangeStr = `${firstUsable.join('.')} - ${lastUsable.join('.')}`;
    }

    setResults({
      ip,
      cidr: cidrNum.toString(),
      subnetMask: subnetMaskStr,
      networkAddress: networkAddressStr,
      broadcastAddress: broadcastAddressStr,
      usableRange: rangeStr,
      totalHosts: totalHosts.toLocaleString(),
      wildcardMask: wildcardMaskStr,
    });
  };

  return (
    <div className="glass-panel subnet-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <Network size={28} className="gradient-text" style={{ color: 'var(--accent-cyan)' }} />
        <h3 style={{ margin: 0, fontSize: '22px' }}>Subnetting Playground (IT Tool)</h3>
      </div>
      
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '15px' }}>
        Practice subnetting or check network metrics! In the BIT curriculum, understanding routing and subnet masks is vital. Enter an IP and CIDR prefix to calculate.
      </p>

      <form onSubmit={calculateSubnet} className="subnet-form">
        <div className="subnet-input-group">
          <input
            type="text"
            className="subnet-input"
            placeholder="IP Address (e.g. 192.168.1.1)"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
        </div>
        <div className="subnet-input-group" style={{ flex: '1', minWidth: '80px' }}>
          <input
            type="number"
            className="subnet-input"
            placeholder="CIDR (e.g. 24)"
            min="0"
            max="32"
            value={cidr}
            onChange={(e) => setCidr(e.target.value)}
          />
        </div>
        <button type="submit" className="subnet-btn">
          Calculate
        </button>
      </form>

      {error && (
        <div style={{ color: 'var(--accent-red)', marginBottom: '16px', fontSize: '14px', fontWeight: 500 }}>
          {error}
        </div>
      )}

      <div className="subnet-results-grid">
        <div className="subnet-result-box">
          <span className="subnet-result-label">IP Address Prefix</span>
          <span className="subnet-result-value">{results.ip} / {results.cidr}</span>
        </div>
        <div className="subnet-result-box">
          <span className="subnet-result-label">Subnet Mask</span>
          <span className="subnet-result-value">{results.subnetMask}</span>
        </div>
        <div className="subnet-result-box">
          <span className="subnet-result-label">Network IP</span>
          <span className="subnet-result-value">{results.networkAddress}</span>
        </div>
        <div className="subnet-result-box">
          <span className="subnet-result-label">Broadcast IP</span>
          <span className="subnet-result-value">{results.broadcastAddress}</span>
        </div>
        <div className="subnet-result-box">
          <span className="subnet-result-label">Wildcard Mask</span>
          <span className="subnet-result-value">{results.wildcardMask}</span>
        </div>
        <div className="subnet-result-box">
          <span className="subnet-result-label">Usable Host Range</span>
          <span className="subnet-result-value">{results.usableRange}</span>
        </div>
        <div className="subnet-result-box" style={{ gridColumn: 'span 1' }}>
          <span className="subnet-result-label">Total Usable Hosts</span>
          <span className="subnet-result-value" style={{ color: 'var(--accent-green)' }}>{results.totalHosts}</span>
        </div>
      </div>
    </div>
  );
}
