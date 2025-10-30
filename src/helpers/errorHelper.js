export function getErrorMessage(error) {
    const message = error?.message || '';
    if (message.includes('HTTP 404')) return 'Produk tidak ditemukan (404).';
    if (/network/i.test(message)) return 'Gagal terhubung ke server.';
    return message || 'Gagal memuat produk.';
}
