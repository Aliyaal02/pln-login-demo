import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../utils/authContext';
import './Dashboard.css';

const initialBillingItems = [
  {
    id: 1,
    title: 'Tagihan Listrik Bulan Ini',
    amount: 525000,
    dueDate: '15 Juni 2024',
    status: 'Belum Dibayar',
    note: 'Tagihan normal untuk penggunaan 350 kWh',
  },
  {
    id: 2,
    title: 'Tagihan Tambahan Puncak',
    amount: 135000,
    dueDate: '20 Juni 2024',
    status: 'Menunggu',
    note: 'Biaya beban tambahan pada jam puncak',
  },
];

const initialAdminUsers = [
  { id: 1, fullName: 'Demo User', email: 'demo@pln.co.id', role: 'user', status: 'Aktif' },
  { id: 2, fullName: 'Budi Santoso', email: 'budi@pln.co.id', role: 'user', status: 'Nonaktif' },
  { id: 3, fullName: 'Admin PLN', email: 'admin@pln.co.id', role: 'admin', status: 'Aktif' },
];

const initialAdminSettings = {
  supportEmail: 'support@pln.co.id',
  maintenanceMode: false,
  tariffRate: 'Rp 1.444 / kWh',
};

function Dashboard() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isAdmin = user?.role === 'admin';
  const [billingItems, setBillingItems] = useState(initialBillingItems);
  const [selectedBillingId, setSelectedBillingId] = useState(initialBillingItems[0].id);

  const selectedBilling = billingItems.find((item) => item.id === selectedBillingId) || billingItems[0];
  const totalBilling = billingItems.reduce((sum, item) => sum + item.amount, 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const [selectedAdminPanel, setSelectedAdminPanel] = useState('manageUsers');
  const [adminUsers, setAdminUsers] = useState(initialAdminUsers);
  const [selectedUserId, setSelectedUserId] = useState(initialAdminUsers[0].id);
  const [adminReportType, setAdminReportType] = useState('monthly');
  const [adminSettings, setAdminSettings] = useState(initialAdminSettings);

  const handleSelectBilling = (id) => setSelectedBillingId(id);
  const handleAdminPanelSelect = (panel) => setSelectedAdminPanel(panel);
  const selectedUser = adminUsers.find((user) => user.id === selectedUserId) || adminUsers[0];

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingItems((prev) =>
      prev.map((item) =>
        item.id === selectedBillingId
          ? {
              ...item,
              [name]: name === 'amount' ? Number(value) : value,
            }
          : item,
      ),
    );
  };

  const saveBillingChanges = () => {
    alert(`Perubahan tagihan "${selectedBilling.title}" berhasil disimpan.`);
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setAdminUsers((prev) =>
      prev.map((item) =>
        item.id === selectedUserId ? { ...item, [name]: value } : item,
      ),
    );
  };

  const saveUserChanges = () => {
    alert(`Perubahan pengguna "${selectedUser.fullName}" berhasil disimpan.`);
  };

  const handleReportTypeChange = (e) => setAdminReportType(e.target.value);

  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAdminSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const saveSettings = () => {
    alert('Pengaturan sistem berhasil disimpan.');
  };

  const dashboardItems = [
    { icon: '📊', title: 'Penggunaan Listrik', value: '350 kWh', color: '#3b82f6' },
    { icon: '💳', title: 'Total Tagihan', value: formatCurrency(totalBilling), color: '#f59e0b' },
    { icon: '⚡', title: 'Status Layanan', value: 'Aktif', color: '#10b981' },
    { icon: '📅', title: 'Jatuh Tempo', value: selectedBilling.dueDate, color: '#8b5cf6' },
  ];

  const recentActivities = [
    { date: '15 Juni 2024', activity: 'Login ke dashboard', status: 'Berhasil' },
    { date: '14 Juni 2024', activity: 'Reset password', status: 'Berhasil' },
    { date: '13 Juni 2024', activity: 'Edit profil', status: 'Berhasil' },
    { date: '12 Juni 2024', activity: 'Pembayaran tagihan', status: 'Berhasil' },
  ];

  return (
    <div className="dashboard-wrapper">
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className={`dashboard-layout ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        <div className="dashboard-container" onClick={closeSidebar}>
          <div className="welcome-section" id="overview">
            <h2>Selamat datang, {user?.fullName}!</h2>
            <p>Kelola akun listrik Anda dengan mudah</p>
          </div>

          <div className="dashboard-grid" id="usage">
            {dashboardItems.map((item, index) => (
              <div key={index} className="dashboard-card" style={{ borderTopColor: item.color }}>
                <div className="card-icon">{item.icon}</div>
                <div className="card-content">
                  <p className="card-title">{item.title}</p>
                  <p className="card-value">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {isAdmin && (
            <div className="section-card full-width admin-panel-card">
              <h3>Admin Panel</h3>
              <div className="admin-panel-shell">
                <div className="admin-panel-menu">
                  <button
                    type="button"
                    className={selectedAdminPanel === 'manageUsers' ? 'admin-panel-tab active' : 'admin-panel-tab'}
                    onClick={() => handleAdminPanelSelect('manageUsers')}
                  >
                    📋 Kelola Pengguna
                  </button>
                  <button
                    type="button"
                    className={selectedAdminPanel === 'reports' ? 'admin-panel-tab active' : 'admin-panel-tab'}
                    onClick={() => handleAdminPanelSelect('reports')}
                  >
                    📈 Laporan Admin
                  </button>
                  <button
                    type="button"
                    className={selectedAdminPanel === 'settings' ? 'admin-panel-tab active' : 'admin-panel-tab'}
                    onClick={() => handleAdminPanelSelect('settings')}
                  >
                    🛠️ Pengaturan Sistem
                  </button>
                </div>

                <div className="admin-panel-body">
                  {selectedAdminPanel === 'manageUsers' && (
                    <div className="admin-panel-section">
                      <div className="admin-user-list">
                        {adminUsers.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            className={item.id === selectedUserId ? 'admin-user-card active' : 'admin-user-card'}
                            onClick={() => setSelectedUserId(item.id)}
                          >
                            <div>
                              <p className="admin-user-name">{item.fullName}</p>
                              <p className="admin-user-email">{item.email}</p>
                            </div>
                            <span className="admin-user-role">{item.role}</span>
                          </button>
                        ))}
                      </div>

                      <div className="admin-user-detail">
                        <h4>Edit Pengguna</h4>
                        <div className="billing-field">
                          <label>Nama Lengkap</label>
                          <input
                            name="fullName"
                            value={selectedUser.fullName}
                            onChange={handleUserChange}
                          />
                        </div>
                        <div className="billing-field">
                          <label>Email</label>
                          <input
                            name="email"
                            value={selectedUser.email}
                            onChange={handleUserChange}
                          />
                        </div>
                        <div className="billing-field">
                          <label>Peran</label>
                          <select name="role" value={selectedUser.role} onChange={handleUserChange}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                        <div className="billing-field">
                          <label>Status Akun</label>
                          <select name="status" value={selectedUser.status} onChange={handleUserChange}>
                            <option>Aktif</option>
                            <option>Nonaktif</option>
                          </select>
                        </div>
                        <button type="button" className="save-billing-btn" onClick={saveUserChanges}>
                          Simpan Perubahan Pengguna
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedAdminPanel === 'reports' && (
                    <div className="admin-panel-section admin-report-section">
                      <div className="billing-field">
                        <label>Pilih jenis laporan</label>
                        <select value={adminReportType} onChange={handleReportTypeChange}>
                          <option value="monthly">Laporan Bulanan</option>
                          <option value="annual">Laporan Tahunan</option>
                        </select>
                      </div>
                      <div className="admin-report-metrics">
                        <div className="report-card">
                          <h5>Total Pengguna</h5>
                          <p>{adminUsers.length}</p>
                        </div>
                        <div className="report-card">
                          <h5>Tagihan Aktif</h5>
                          <p>{billingItems.length}</p>
                        </div>
                        <div className="report-card">
                          <h5>Status Laporan</h5>
                          <p>{adminReportType === 'monthly' ? 'Siap' : 'Siap'}</p>
                        </div>
                      </div>
                      <p className="report-note">Menampilkan ringkasan {adminReportType === 'monthly' ? 'bulanan' : 'tahunan'} untuk aktivitas pengguna dan tagihan.</p>
                    </div>
                  )}

                  {selectedAdminPanel === 'settings' && (
                    <div className="admin-panel-section admin-settings-section">
                      <div className="billing-field">
                        <label>Email Dukungan</label>
                        <input
                          name="supportEmail"
                          value={adminSettings.supportEmail}
                          onChange={handleSettingsChange}
                        />
                      </div>
                      <div className="billing-field toggle-field">
                        <label>Maintenance Mode</label>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            name="maintenanceMode"
                            checked={adminSettings.maintenanceMode}
                            onChange={handleSettingsChange}
                          />
                          <span className="slider" />
                        </label>
                      </div>
                      <div className="billing-field">
                        <label>Tarif Dasar</label>
                        <input
                          name="tariffRate"
                          value={adminSettings.tariffRate}
                          onChange={handleSettingsChange}
                        />
                      </div>
                      <button type="button" className="save-billing-btn" onClick={saveSettings}>
                        Simpan Pengaturan Sistem
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="content-grid" id="billing">
            <div className="section-card billing-menu-card">
              <h3>Menu Tagihan</h3>
              <div className="billing-menu">
                {billingItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`billing-item ${item.id === selectedBillingId ? 'active' : ''}`}
                    onClick={() => handleSelectBilling(item.id)}
                  >
                    <div>
                      <p className="billing-title">{item.title}</p>
                      <p className="billing-subtitle">{formatCurrency(item.amount)}</p>
                    </div>
                    <span className={`billing-status ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {item.status}
                    </span>
                  </button>
                ))}
              </div>

              <div className="billing-detail">
                <h4>Detail Tagihan</h4>
                <div className="billing-field">
                  <label>Nama Tagihan</label>
                  <input
                    type="text"
                    name="title"
                    value={selectedBilling.title}
                    onChange={handleBillingChange}
                  />
                </div>
                <div className="billing-field">
                  <label>Jumlah (Rp)</label>
                  <input
                    type="number"
                    name="amount"
                    value={selectedBilling.amount}
                    min="0"
                    onChange={handleBillingChange}
                  />
                </div>
                <div className="billing-field">
                  <label>Jatuh Tempo</label>
                  <input
                    type="text"
                    name="dueDate"
                    value={selectedBilling.dueDate}
                    onChange={handleBillingChange}
                  />
                </div>
                <div className="billing-field">
                  <label>Status</label>
                  <select name="status" value={selectedBilling.status} onChange={handleBillingChange}>
                    <option>Belum Dibayar</option>
                    <option>Menunggu</option>
                    <option>Terbayar</option>
                  </select>
                </div>
                <div className="billing-field">
                  <label>Catatan</label>
                  <textarea
                    name="note"
                    value={selectedBilling.note}
                    onChange={handleBillingChange}
                  />
                </div>
                <button type="button" className="save-billing-btn" onClick={saveBillingChanges}>
                  Simpan Perubahan
                </button>
              </div>
            </div>

            <div className="section-card">
              <h3>Informasi Akun</h3>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">Nama Lengkap:</span>
                  <span className="info-value">{user?.fullName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{user?.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">No. Akun:</span>
                  <span className="info-value">2601001{user?.id}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Status:</span>
                  <span className="info-value status-active">Aktif</span>
                </div>
              </div>
            </div>
          </div>

          <div className="section-card full-width" id="activity">
            <h3>Aktivitas Terbaru</h3>
            <div className="activity-table">
              <table>
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Aktivitas</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((activity, index) => (
                    <tr key={index}>
                      <td>{activity.date}</td>
                      <td>{activity.activity}</td>
                      <td><span className="status-badge success">{activity.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="section-card full-width tips-card" id="tips">
            <h3>💡 Tips Hemat Energi</h3>
            <ul className="tips-list">
              <li>Matikan lampu saat tidak digunakan</li>
              <li>Gunakan AC pada suhu 24-26°C</li>
              <li>Hindari penggunaan peak hours (17:00-21:00)</li>
              <li>Gunakan peralatan hemat energi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
