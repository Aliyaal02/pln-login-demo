export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  // Minimal 6 karakter, minimal 1 huruf besar, 1 angka
  const regex = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
  return regex.test(password);
};

export const getPasswordStrength = (password) => {
  let strength = 0;
  
  if (password.length >= 6) strength++;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*]/.test(password)) strength++;

  if (strength <= 2) return { level: 'Lemah', color: '#ef4444' };
  if (strength === 3) return { level: 'Sedang', color: '#f97316' };
  if (strength === 4) return { level: 'Kuat', color: '#eab308' };
  return { level: 'Sangat Kuat', color: '#22c55e' };
};
