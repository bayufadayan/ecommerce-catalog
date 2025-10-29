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
    padding: 24px;
    color: #666;
    border: 1px dashed #e5e5e5;
    border-radius: 12px;
}

.title {
    font-weight: 600;
    margin-bottom: 6px;
    color: #111;
}

.desc {
    font-size: 14px;
}
</style>
