# PLN Login Demo

Aplikasi demo autentikasi dan login untuk Perusahaan Listrik Negara (PLN).

## 📋 Features

- **Login** - Login dengan Email dan Password
- **Sign Up** - Registrasi akun baru dengan validasi
- **Password Reset** - Reset password via email (demo)
- **Dashboard** - Halaman utama setelah login
- **Session Management** - Manajemen session dengan localStorage
- **Form Validation** - Validasi real-time untuk semua form
- **Responsive Design** - Mobile-friendly interface

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 atau lebih tinggi)
- npm atau yarn

### Installation

1. Navigate ke project folder
```bash
cd pln-login-demo
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm start
```

4. Buka [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
pln-login-demo/
├── public/
│   ├── index.html
│   └── robots.txt
├── src/
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Login.css
│   │   ├── SignUp.js
│   │   ├── SignUp.css
│   │   ├── ForgotPassword.js
│   │   ├── ForgotPassword.css
│   │   ├── Dashboard.js
│   │   └── Dashboard.css
│   ├── components/
│   │   ├── ProtectedRoute.js
│   │   └── Navbar.js
│   ├── utils/
│   │   ├── authContext.js
│   │   └── validation.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🎯 Demo Credentials

### Untuk Testing:
- **Email:** demo@pln.co.id
- **Password:** Demo@123

(Password dapat diubah setelah sign up)

## 🛠️ Available Scripts

### `npm start`
Menjalankan app dalam development mode di [http://localhost:3000](http://localhost:3000).

### `npm build`
Build app untuk production ke folder `build`.

### `npm test`
Menjalankan test runner dalam interactive watch mode.

## 📱 Pages

### Login Page
- Input email dan password
- "Remember me" checkbox
- Link ke Sign Up dan Forgot Password
- Form validation
- Loading state saat login

### Sign Up Page
- Input nama lengkap, email, password, confirm password
- Real-time validation
- Password strength indicator
- Terms & conditions checkbox
- Link ke Login

### Forgot Password Page
- Input email untuk reset password
- Instruksi reset dikirim (demo)
- Link kembali ke Login

### Dashboard Page
- Welcome message
- Informasi user
- Logout button
- Protected route (hanya akses setelah login)

## 🔐 Security Notes

- Ini adalah aplikasi DEMO untuk tujuan pembelajaran
- Password disimpan di localStorage (BUKAN untuk production)
- Gunakan HTTPS dan proper backend authentication di production
- Implementasi proper session management dan JWT di production
- Never hardcode credentials dalam kode

## 🎨 Styling

- Responsive CSS dengan mobile-first approach
- Consistent color scheme (Blue theme)
- Smooth transitions dan animations
- Form focus states dan error messaging

## 📝 Notes

- Aplikasi ini menggunakan localStorage untuk demo purposes
- Data akan hilang jika cache browser dibersihkan
- Untuk production, gunakan proper backend dengan database

## 📧 Support

Untuk informasi lebih lanjut tentang PLN, kunjungi [www.pln.co.id](https://www.pln.co.id)

## 📄 License

Educational dan demonstration purposes.
