export const DEFAULT_FILTERS = Object.freeze({
    category: 'all',
    query: '',
    sortBy: 'relevance'
})

export const SORT_OPTIONS = Object.freeze([
    { label: 'Relevance', value: 'relevance' },
    { label: 'Price ↑', value: 'price-asc' },
    { label: 'Price ↓', value: 'price-desc' },
    { label: 'Name A-Z', value: 'name-asc' },
    { label: 'Rating ★', value: 'rating-desc' }
])
