# Roadmap Proyek (Vue 2 + Vue Router + Vuex + Fake Store API)

> **Tujuan:** mini e-commerce dengan alur login (dummy), katalog, detail produk, dan keranjang.
> **API:** `https://fakestoreapi.com` (data mock; `POST/PUT/DELETE`)

---

## Phase 0 — Fondasi, **Setup Project**, **Setup Vuex (store duluan)**, & Slicing UI

### 0.1 Ringkasan Target Phase 0

* Menyiapkan proyek Vue 2 berikut dependensi utama.
* Menetapkan *routing map* (daftar halaman) tanpa implementasi.
* **Menyiapkan kerangka Vuex (modules & state awal) sebelum UI.**
* Mendefinisikan kontrak API yang akan dipakai.
* Menentukan rencana **slicing UI** (komponen reusable).
* Menetapkan standar UX (loading/error/empty), design tokens, dan DoD.

---

### 0.2 Setup Project (tanpa coding implementasi fitur)

* **Inisialisasi proyek**: Vue 2 (CLI/Vite Vue2), TypeScript opsional.
* **Dependensi inti**:

  * `vue`, `vue-router`, `vuex`
  * `axios` (HTTP client)
  * (opsional) util kecil: dayjs, lodash-es (debounce), dll.
* **Konvensi & standar**:

  * Struktur folder, alias `@` → `src/`
  * Linting/formatting (ESLint + Prettier) — opsional tapi disarankan
  * Envari (`.env`) untuk `VITE_API_BASE=https://fakestoreapi.com` (atau set langsung di client API)

**Deliverables:**

* Proyek terbuat dan bisa `serve`/`build`.
* Alias `@` berfungsi.
* File env (opsional) tersedia.

---

### 0.3 Struktur Proyek (rencana)

```
src/
  api/
    client.js            # konfigurasi axios (baseURL, interceptor)
    products.js          # deklarasi fungsi panggil endpoint produk
    auth.js              # deklarasi fungsi login dummy
    users.js             # deklarasi fungsi user (opsional)
    carts.js             # deklarasi fungsi checkout dummy
  assets/                # ikon, gambar, style global
  components/
    common/              # LoadingSpinner, ErrorBanner, Toast, EmptyState
    products/            # ProductCard, CategoryFilter, SortSelect, SearchBar
    product-detail/      # ProductGallery, PriceBlock, RatingBadge
    cart/                # CartItem, CartSummary
    auth/                # LoginForm
    layout/              # Navbar, Footer
  pages/
    LoginPage.vue
    ProductsPage.vue
    ProductDetailPage.vue
    CartPage.vue
    ProfilePage.vue      # opsional (protected)
  router/
    index.js             # daftar rute (tanpa guard rumit dulu)
  store/
    index.js             # inisialisasi Vuex root
    modules/
      auth.js            # token, user, status (dummy)
      products.js        # list, categories, filter/sort/search
      cart.js            # items, subtotal, totalItems (persist)
  styles/
    tokens.css           # warna, spacing, shadow (opsional)
    utilities.css        # helper class (opsional)
  App.vue
  main.js
```

**Catatan:** di Phase 0 cukup siapkan *file kosong* / stub & struktur; isi detailnya nanti di Phase berikut.

---

### 0.4 Routing Map (halaman yang akan dibuat & di-slice)

1. **`/login` — Login Page (dummy)**

   * Tujuan: form username/password, aksi login, tampilkan error.
   * Navigasi sekunder: link ke `/products`.

2. **`/products` — Products List (Landing)**

   * Grid kartu produk: gambar, judul, kategori, harga (IDR).
   * **Filter kategori**, **sort** (harga/nama), **search** (debounce).
   * Loading/error/empty state.

3. **`/products/:id` — Product Detail**

   * Gambar besar, judul, kategori, rating, harga (IDR), deskripsi.
   * Aksi: **Tambah ke Keranjang**.

4. **`/cart` — Cart**

   * Daftar item, ubah qty, hapus item, subtotal, tombol **Checkout** (dummy).

5. **`/profile` (opsional, protected)**

   * Data user dummy dari `/users/:id`, ditutup akses tanpa token.

**Layout global:**
`Navbar` (link: Products, Cart + badge, Login/Profile) & `Footer`.

---

### 0.5 **Setup Vuex (store duluan, sebelum UI)**

> Menyiapkan **kerangka** modules, state awal, getters, dan *naming* actions/mutations. **Belum** implementasi logic penuh — hanya kontrak & *shape* agar UI nanti terpasang rapi.

* **Root Store**

  * Registrasi modules: `auth`, `products`, `cart`.
  * *Plugin* persist (opsional) untuk cart via `localStorage`.

* **Module: `auth`**

  * **state**:

    * `token: string|null`
    * `user: object|null` (opsional; basic info user dummy)
    * `status: 'idle'|'loading'|'error'|'success'`
  * **getters**:

    * `isAuthenticated` (boolean)
  * **actions (kontrak)**:

    * `login({ username, password })` → POST `/auth/login` (dummy)
    * `logout()` → bersihkan token/user
  * **mutations (kontrak)**:

    * `setToken`, `setUser`, `setStatus`, `clearAuth`

* **Module: `products`**

  * **state**:

    * `list: []`
    * `categories: []`
    * `selectedCategory: 'all'`
    * `search: ''`
    * `sort: 'price-asc' | 'price-desc' | 'title-asc' | 'title-desc'`
    * `loading: false`
    * `error: ''`
  * **getters**:

    * `filteredProducts` (menggabungkan kategori + search + sort)
  * **actions (kontrak)**:

    * `boot()` → parallel `GET /products` + `GET /products/categories`
    * `changeCategory(name)` → `GET /products` / `GET /products/category/:name`
  * **mutations (kontrak)**:

    * `setProducts`, `setCategories`, `setSelectedCategory`, `setSearch`, `setSort`, `setLoading`, `setError`

* **Module: `cart`**

  * **state**:

    * `items: [{ product, qty }]` (default `[]`)
  * **getters**:

    * `totalItems`
    * `subTotal`
  * **actions (opsional kontrak)**:

    * (boleh langsung pakai mutations untuk kesederhanaan)
  * **mutations (kontrak)**:

    * `add(product)`
    * `remove(productId)`
    * `setQty({ id, qty })`
    * `clear()`
    * `persist()` (sync ke `localStorage`)

**Deliverables:**

* File‐file module Vuex sudah tersedia dengan **state & nama getters/actions/mutations terdefinisi**, meski isinya masih stub.
* Root store sudah register modules.

---

### 0.6 Kontrak API (endpoint yang dipakai)

* **Products**

  * `GET /products` (list semua)
  * `GET /products/:id` (detail)
  * `GET /products/categories` (daftar kategori)
  * `GET /products/category/:name` (produk per kategori)
* **Auth (dummy)**

  * `POST /auth/login` → token dummy
* **Users (opsional)**

  * `GET /users/:id` (profil)
* **Carts (dummy)**

  * `POST /carts` (checkout simulasi)

> Catatan: `POST/PUT/DELETE` **tidak persisten** (mock response only).

---

### 0.7 Slicing UI (komponen reusable yang disiapkan)

* **Global**

  * `layout/Navbar.vue`, `layout/Footer.vue`
  * `common/LoadingSpinner.vue`, `common/SkeletonCard.vue`
  * `common/ErrorBanner.vue` (pesan + tombol Retry)
  * `common/Toast.vue` (notifikasi add-to-cart / checkout)
* **Products**

  * `products/ProductCard.vue`
  * `products/CategoryFilter.vue`
  * `products/SortSelect.vue`
  * `products/SearchBar.vue` (dengan debounce)
* **Product Detail**

  * `product-detail/ProductGallery.vue`
  * `product-detail/PriceBlock.vue` (format IDR)
  * `product-detail/RatingBadge.vue`
* **Cart**

  * `cart/CartItem.vue`
  * `cart/CartSummary.vue`
* **Auth**

  * `auth/LoginForm.vue`

**Deliverables:**

* Daftar file komponen dibuat (boleh kosong/skeleton).
* Style baseline & tokens (opsional) ditentukan.

---

### 0.8 Standar UX & Design Tokens (ringkas)

* **Loading**: gunakan `SkeletonCard` untuk list; spinner untuk detail/aksi kecil.
* **Error**: `ErrorBanner` dengan CTA **Retry** yang memanggil ulang aksi terkait.
* **Empty**: `EmptyState` copy yang ramah (“Belum ada item di keranjang”).
* **Aksesibilitas**: alt pada gambar, fokus ring di elemen interaktif.
* **Responsif**: grid adaptif (2 kolom mobile → 4 kolom desktop).
* **Design tokens (opsional)**:

  * Warna: `--brand`, `--text`, `--muted`, `--bg`
  * Spacing: `--sp-1..--sp-6`
  * Shadows & radius: `--radius-md`, `--shadow-sm`

---

### 0.9 Definition of Done — Phase 0

* Proyek **ter-setup**, bisa dijalankan.
* **Vue Router** punya rute: `/login`, `/products`, `/products/:id`, `/cart`, `/profile` (opsional).
* **Vuex store** terpasang dengan **modules & state** (stub) sesuai kontrak.
* Folder & **nama komponen UI** untuk slicing dibuat (boleh bernilai *placeholder*).
* Kontrak API disepakati, *baseURL* jelas.
* Standar UX & DoD terdokumentasi.

---

### 0.10 Hand-off ke Phase 1

* Mulai implementasi **Auth (dummy)**:

  * Isi `api/auth.js` (login dummy).
  * Lengkapi logic `store/modules/auth.js`.
  * Implementasi `LoginPage.vue` + `auth/LoginForm.vue`.
  * Navbar bereaksi terhadap status login (Login ↔ Profile/Logout).

---

## Phase 1 — Auth (Dummy)

* Implement login (token dummy) + persist token, *route guard* opsional, Profile opsional.

## Phase 2 — Katalog Produk

* Fetch list & categories, filter/sort/search, skeleton/error.

## Phase 3 — Detail Produk

* Detail lengkap + Add to Cart (toast sukses).

## Phase 4 — Keranjang & Checkout (Dummy)

* CRUD item keranjang, subtotal, checkout dummy (`POST /carts`) lalu clear.

## Phase 5 — UX & QoL

* Komponen loading/error/toast, SWR ringan (cache memori + revalidate), responsif & aksesibilitas.

## Phase 6 — Opsi Lanjutan

* Wishlist, infinite scroll, filter harga, protected profile, form “create product” **lokal** (Vuex/localStorage), dan testing ringan.

---

Kalau checklist Phase 0 ini sudah **OK**, bilang ya—nanti kita lanjut ke **Phase 1** dengan rincian *field* form login, alur aksi Vuex, dan skenario error/validasi yang mau di-handle.
