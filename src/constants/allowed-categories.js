export const ALLOWED_CATEGORIES_RAW = [
    "men's clothing",
    "women's clothing"
];

export const normalizeCategory = (category) => {
    return String(category || '').trim().toLowerCase();
};

export const ALLOWED_CATEGORIES = new Set(
    ALLOWED_CATEGORIES_RAW.map(normalizeCategory)
);

export const isAllowedCategory = (category) => {
    return ALLOWED_CATEGORIES.has(normalizeCategory(category));
};

export const allowedCategoriesList = () => ["all", ...ALLOWED_CATEGORIES_RAW];