# 🛍️ Ecommerce Catalog

Katalog produk berbasis web untuk melihat katalog Pakaian wanita dan pria berdasarkan API dari [**FakestoreAPI**](https://fakestoreapi.com/docs/).

**Final Project — Rakamin x Core Initiative**
<p align="center">
  <a href="https://final-task-rakamin.bayufadayan.my.id/">
    <img
      alt="Live Demo"
      src="https://img.shields.io/badge/Live%20Demo-4CAF50?style=for-the-badge&logo=vuedotjs&logoColor=white"
    />
  </a>
  <a href="https://ecommerce-catalog-jet-kappa.vercel.app/">
    <img
      alt="Alternative Demo"
      src="https://img.shields.io/badge/Alternative%20Demo-2196F3?style=for-the-badge&logo=googlechrome&logoColor=white"
    />
  </a>
</p>

---

## 🧭 Sekilas Proyek
Aplikasi **Single Page Application (SPA)** yang menampilkan daftar produk, detail produk, pencarian, filter kategori, serta fitur *cart* berbasis state management.  
Data diambil dari **public REST API**, sehingga fokus utama proyek ini adalah pada **pengalaman pengguna (UX)**, **pola state**, dan **arsitektur komponen** yang efisien.

- **Live Demo:** [https://ecommerce-catalog-jet-kappa.vercel.app](https://ecommerce-catalog-jet-kappa.vercel.app)  
- **Data Source:** [Fake Store API](https://fakestoreapi.com/)

---

## 🎯 Tujuan & Sorotan
**Tujuan:** memenuhi Final Task Rakamin x Core Initiative dengan membangun aplikasi katalog e-commerce fungsional menggunakan Vue 2 + Vuex.

**Sorotan UX:**
- Loading & error yang jelas
- Tampilan responsif (mobile–desktop)
- Empty state informatif saat hasil kosong

---

## ✨ Fitur Utama
- **Katalog & Detail Produk** — grid listing dan halaman detail dengan informasi inti  
- **Pencarian & Filter** — pencarian nama produk & filter kategori  
- **Cart** — simpan produk dan tambahkan ke keranjang  
- **Kategori** — navigasi cepat antar kategori produk  

> Catatan: fitur disusun agar mudah dikembangkan ke *pagination*, *sorting*, dan *checkout* di tahap berikutnya.

---

## 🧩 Stack Teknologi
- **Vue 2** — komponen & reaktivitas  
- **Vuex** — state management global (produk, cart, favorit, dsb.)  
- **Vite** — dev server & bundling cepat  
- **Nginx / Vercel** — opsi serving & deployment  

---

### 📂 Project Structure

```
ecommerce-catalog/
├── public/
│   └── logo.svg
├── src/
│   ├── api/                # API clients (auth, products, users)
│   ├── assets/             # Static assets (styles, images)
│   ├── components/         # Reusable Vue components
│   │   ├── auth/           # Login form
│   │   ├── common/         # Generic UI (button, spinner, toast, etc.)
│   │   ├── layout/         # Navbar, Footer
│   │   └── products/       # Product-related components
│   ├── constants/          # Constants and config values
│   ├── helpers/            # Helper utilities (error, filter, number)
│   ├── router/             # Vue Router setup
│   ├── store/              # Vuex store modules
│   ├── utils/              # Utility functions (debounce, jwt, format)
│   ├── views/              # Page views (Cart, Checkout, Product, etc.)
│   ├── App.vue             # Root component
│   └── main.js             # App entry point
├── Dockerfile              # Docker setup
├── nginx.conf              # Nginx configuration
├── vite.config.js          # Vite config
├── vercel.json             # Vercel deployment config
├── .env.example            # Example environment variables
└── package.json            # Project metadata & dependencies
```  
---

## 🙌 Kredit
- **Fake Store API** — sumber data produk  
- **Rakamin x Core Initiative** — konteks tugas akhir

---

<p align="center">
</p>
<p align="center">
    <a href="https://github.com/bayufadayan">
        <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
    </a>
    <a href="https://www.linkedin.com/in/muhamad-bayu-fadayan/">
        <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/>
    </a>
    <a href="https://bayufadayan.my.id/">
        <img src="https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
    </a>
    <a href="https://drive.google.com/file/d/1fPClIxWKbeaKyArwL9cSIDmOFeT-tBt2/view?usp=drive_link">
        <img src="https://img.shields.io/badge/CURRICULUM%20VITAE-4285F4?style=for-the-badge&logo=googledrive&logoColor=white"/>
    </a>
</p>

<p align="center">
  Made with ❤️ by <a href="https://github.com/bayufadayan">Bayu Fadayan</a><br/>
  <img src="https://img.shields.io/badge/Year-2025-blue?style=flat-square"/> 
  <img src="https://img.shields.io/badge/Role-Frontend%20Engineer-purple?style=flat-square"/><br/><br/>
  <a href="https://github.com/bayufadayan/ecommerce-catalog">
    <img src="https://img.shields.io/badge/Go%20to%20this%20repository-000000?style=flat-square&logo=github&logoColor=white"/>
  </a>
</p>
