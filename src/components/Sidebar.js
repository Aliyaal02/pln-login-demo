import React from 'react';
import './Sidebar.css';

const navItems = [
  { label: 'Dashboard', icon: '🏠', href: '#overview' },
  { label: 'Penggunaan Listrik', icon: '💡', href: '#usage' },
  { label: 'Tagihan', icon: '💳', href: '#billing' },
  { label: 'Layanan', icon: '⚙️', href: '#activity' },
  { label: 'Dukungan', icon: '📞', href: '#tips' },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`sidebar-backdrop ${isOpen ? 'visible' : ''}`} onClick={onClose}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">⚡</div>
          <div>
            <p className="sidebar-title">PLN Portal</p>
            <span className="sidebar-subtitle">Dashboard Akun</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="sidebar-link"
              onClick={onClose}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span>Versi Demo 1.0</span>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
