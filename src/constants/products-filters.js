// Nilai awal filter katalog
export const DEFAULT_FILTERS = Object.freeze({
    category: 'all',   // 'all' | '<nama-kategori>'
    query: '',         // pencarian teks (title/description)
    sortBy: 'relevance'// 'relevance' | 'price-asc' | 'price-desc' | 'name-asc' | 'rating-desc'
})

// Opsi sort yang akan ditampilkan di UI (label+value)
export const SORT_OPTIONS = Object.freeze([
    { label: 'Relevance', value: 'relevance' },
    { label: 'Price ↑', value: 'price-asc' },
    { label: 'Price ↓', value: 'price-desc' },
    { label: 'Name A-Z', value: 'name-asc' },
    { label: 'Rating ★', value: 'rating-desc' }
])
