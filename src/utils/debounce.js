// src/utils/debounce.js
export default function debounce(fn, wait = 300) {
    let t = null
    return function (...args) {
        clearTimeout(t)
        t = setTimeout(() => fn.apply(this, args), wait)
    }
}
