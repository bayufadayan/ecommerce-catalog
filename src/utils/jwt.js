// src/utils/jwt.js
export function decodeJwtPayload(token) {
    try {
        if (!token || typeof token !== 'string') return null
        const parts = token.split('.')
        if (parts.length < 2) return null
        const base64 = parts[1]
            .replace(/-/g, '+')
            .replace(/_/g, '/')
            .padEnd(Math.ceil(parts[1].length / 4) * 4, '=')
        const json = atob(base64)
        return JSON.parse(json)
    } catch {
        return null
    }
}

/**
 * Ambil userId dari token FakeStore (biasanya ada di 'sub')
 * Contoh payload: { "sub": 2, "user": "mor_2314", "iat": ... }
 */
export function getUserIdFromToken(token) {
    const payload = decodeJwtPayload(token)
    const sub = payload && payload.sub
    return Number.isFinite(sub) ? sub : null
}
