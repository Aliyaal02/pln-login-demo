import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const defaultAdmin = {
  id: 999999999,
  fullName: 'Admin PLN',
  email: 'admin@pln.co.id',
  password: 'Admin@123',
  role: 'admin',
};

const getStoredUsers = () => JSON.parse(localStorage.getItem('pln_users') || '[]');
const saveUsers = (users) => localStorage.setItem('pln_users', JSON.stringify(users));
const ensureAdminUser = () => {
  const users = getStoredUsers();
  if (!users.some((user) => user.role === 'admin')) {
    users.push(defaultAdmin);
    saveUsers(users);
  }
  return users;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pastikan ada akun admin default di localStorage
    ensureAdminUser();

    const storedUser = localStorage.getItem('pln_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulasi login validation
    const users = getStoredUsers();
    const foundUser = users.find((u) => u.email === email && u.password === password);

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        fullName: foundUser.fullName,
        role: foundUser.role || 'user',
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('pln_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: 'Email atau password salah' };
  };

  const signup = (fullName, email, password) => {
    // Cek apakah email sudah terdaftar
    const users = getStoredUsers();
    if (users.some((u) => u.email === email)) {
      return { success: false, message: 'Email sudah terdaftar' };
    }

    const newUser = {
      id: Date.now(),
      fullName,
      email,
      password, // HANYA UNTUK DEMO - jangan simpan password di localStorage di production
      role: 'user',
    };

    users.push(newUser);
    saveUsers(users);

    const userData = { id: newUser.id, email: newUser.email, fullName: newUser.fullName, role: newUser.role };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('pln_user', JSON.stringify(userData));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('pln_user');
  };

  const resetPassword = (email, newPassword) => {
    // Simulasi reset password
    const users = JSON.parse(localStorage.getItem('pln_users') || '[]');
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem('pln_users', JSON.stringify(users));
      return { success: true, message: 'Password berhasil direset' };
    }
    return { success: false, message: 'Email tidak ditemukan' };
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan dalam AuthProvider');
  }
  return context;
};
