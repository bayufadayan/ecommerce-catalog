import { DEFAULT_FILTERS } from '@/constants/products-filters';
import { FILTERS_KEY } from '@/store/filters.keys';

export function loadFilters() {
    try {
        const raw = localStorage.getItem(FILTERS_KEY);
        if (!raw) return { ...DEFAULT_FILTERS };
        const parsed = JSON.parse(raw);
        return { ...DEFAULT_FILTERS, ...parsed };
    } catch {
        return { ...DEFAULT_FILTERS };
    }
}

export function saveFilters(filters) {
    try {
        localStorage.setItem(FILTERS_KEY, JSON.stringify(filters || {}));
    } catch {
        // ignore
    }
}
