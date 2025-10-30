export function decodeJwtPayload(token) {
    try {
        if (!token || typeof token !== 'string') return null
        const parts = token.split('.')
        if (parts.length < 2) return null
        const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
            .padEnd(Math.ceil(parts[1].length / 4) * 4, '=')
        const json = atob(base64)
        return JSON.parse(json)
    } catch { return null }
}

export function getUserIdFromToken(token) {
    const payload = decodeJwtPayload(token)
    const sub = payload && Number(payload.sub)
    return Number.isFinite(sub) && sub > 0 ? Math.floor(sub) : null
}
