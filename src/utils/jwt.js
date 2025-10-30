/**
 * Decode payload dari JWT token (tanpa verifikasi signature)
 * @param {string} token - JWT token
 * @returns {object|null} - Payload hasil decode atau null jika gagal
 */
export function decodeJwtPayload(token) {
    try {
        if (!token || typeof token !== 'string') return null;

        const parts = token.split('.');
        if (parts.length < 2) return null;

        // Decode bagian payload (index ke-1)
        const base64 = parts[1]
            .replace(/-/g, '+')
            .replace(/_/g, '/')
            .padEnd(Math.ceil(parts[1].length / 4) * 4, '=');

        const json = atob(base64);
        return JSON.parse(json);
    } catch (err) {
        console.error('JWT decode error:', err);
        return null;
    }
}

/**
 * Ambil user ID (sub) dari token JWT
 * @param {string} token - JWT token
 * @returns {number|null} - User ID jika valid, null jika tidak
 */
export function getUserIdFromToken(token) {
    const payload = decodeJwtPayload(token);
    const sub = payload?.sub ? Number(payload.sub) : NaN;
    return Number.isFinite(sub) && sub > 0 ? Math.floor(sub) : null;
}
