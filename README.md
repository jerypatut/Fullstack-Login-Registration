# Form Login dan Register

Proyek ini adalah implementasi **Form Login dan Register** yang dibuat menggunakan **React** untuk frontend dan **Node.js** dengan database **MySQL** untuk backend. Form login hanya membutuhkan *username* dan *password*, sementara form register mencakup *email*, *name*, *password*, dan *nomor HP*. Fitur unggah gambar tersedia di halaman login dan register.

---

## Fitur Utama
1. **Form Login**
   - Input: *username* dan *password*.
   - Validasi sisi klien menggunakan React.
   - Sistem autentikasi sederhana dengan token.

2. **Form Register**
   - Input: *email*, *name*, *password*, dan *nomor HP*.
   - Validasi data sebelum disimpan ke database.
 
4. **Database MySQL**
   - Tabel untuk pengguna yang menyimpan *email*, *name*, *password* (dengan hashing), dan *nomor HP*.

---

## Teknologi yang Digunakan

### Frontend
- **React**
- **JSX**
- **HTML5 & CSS3**

### Backend
- **Node.js** dengan **Express.js**
- **MySQL** untuk database

---

## Struktur Folder
project form login dan registrasi include backend autentifikasi/
├── backend/  test                     # Backend Project Folder
│   ├── node_modules/              # Folder untuk dependencies backend
│   ├── package.json               # Dependencies dan konfigurasi backend
│   ├── server.js                  # File utama untuk backend (Express.js, konfigurasi server)
             # Folder untuk routing backend
     # Routes untuk login, register
      # Routes lain untuk manajemen user
│
├── frontend/                      # Frontend Project Folder
│   ├── node_modules/              # Folder untuk dependencies frontend
│   ├── public/                    # Folder untuk file statis frontend (
│   ├── src/                       # Folder untuk semua file sumber frontend
│   │   ├── assets/                # Folder untuk gambar dan file lainnya
│   │   │   ├── pages/             # Folder untuk komponen halaman
│   │   │   └── logo.png           # Contoh gambar/logo untuk digunakan di aplikasi
  │     ├── Home.jsx           # Halaman utama (Home)
    │   ├── Login.jsx          # Halaman login
│   │  └── Register.jsx       # Halaman register
│   │   ├── App.jsx                # File utama untuk route routing aplikasi
│   │   ├── index.js               # Entry point React
│   │   ├── index.css              # CSS utama untuk aplikasi frontend
│   │   └── reset.css              # CSS reset untuk gaya default

# Project Form Login dan Registrasi

Aplikasi ini adalah sistem form login dan registrasi yang menggunakan React untuk frontend, Node.js untuk backend, dan MySQL sebagai database. Aplikasi ini dilengkapi dengan autentikasi pengguna, baik untuk login maupun registrasi.

## Langkah-langkah untuk Menjalankan Aplikasi

### 1. Buka CMD di Editor Anda

Buka terminal atau CMD di editor kode favorit Anda.

### 2. Instal Dependencies

Instal semua dependencies yang dibutuhkan untuk frontend dengan menjalankan perintah berikut:

```bash
npm install
1. Masuk ke direktori frontend:

cd frontend

2. Jalankan aplikasi frontend:

npm run dev


Akses Aplikasi

Aplikasi dapat diakses di browser pada URL:

http://localhost:5173/
![Logo](./assets/logo.png)
![Logo](./assets/logo.png)

