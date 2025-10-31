// src/constants/allowed-categories.js

/**
 * Daftar kategori yang BOLEH dipakai (mengikuti label asli dari FakeStoreAPI).
 * Jangan diubah kapitalisasinya agar konsisten dengan API.
 */
export const ALLOWED_CATEGORIES_RAW = [
    "men's clothing",
    "women's clothing"
];

/**
 * Normalisasi string kategori → lowercase + trim,
 * supaya perbandingan aman walau kapitalisasi/spacing beda.
 */
export const normalizeCategory = (c) => String(c || '').trim().toLowerCase();

/**
 * Set untuk lookup O(1) saat pengecekan kategori.
 * Disimpan dalam bentuk yang sudah dinormalisasi.
 */
export const ALLOWED_CATEGORIES = new Set(
    ALLOWED_CATEGORIES_RAW.map(normalizeCategory)
);

/**
 * Cek apakah kategori termasuk yang diperbolehkan.
 * @param {string} c - nama kategori dari API
 * @returns {boolean}
 */
export const isAllowedCategory = (c) => ALLOWED_CATEGORIES.has(normalizeCategory(c));

/**
 * Kembalikan list kategori untuk UI (chips/dropdown),
 * selalu diawali dengan 'all', lalu dua kategori yang diizinkan
 * dalam bentuk label asli (agar enak dibaca user).
 */
export const allowedCategoriesList = () => ["all", ...ALLOWED_CATEGORIES_RAW];
