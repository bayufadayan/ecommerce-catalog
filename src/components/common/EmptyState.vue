<template>
    <div class="empty">
        <div class="title">{{ title }}</div>
        <div class="desc" v-if="description">{{ description }}</div>
        <slot />
    </div>
</template>

<script>
export default {
    name: 'EmptyState',
    props: {
        title: { type: String, default: 'Tidak ada data.' },
        description: { type: String, default: '' }
    }
}
</script>

<style scoped>
.empty {
    text-align: center;
    padding: 32px 16px;
    background-color: #fafafa;
    border: 1px solid #e0e0e0;
    color: #555;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    transition: background-color .2s ease, border-color .2s ease;
}

.empty:hover {
    background-color: #f5f5f5;
    border-color: #d0d0d0;
}

.title {
    font-weight: 600;
    font-size: 16px;
    color: #222;
    margin-bottom: 4px;
}

.desc {
    font-size: 14px;
    color: #666;
    max-width: 480px;
    margin: 0 auto 12px;
    line-height: 1.5;
}
</style>
