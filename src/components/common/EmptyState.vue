<script>
export default {
    name: 'EmptyState',
    props: {
        title: { type: String, default: 'Tidak ada data.' },
        description: { type: String, default: '' }
    }
}
</script>

<template>
    <div class="empty">
        <div class="title">{{ title }}</div>
        <div class="desc" v-if="description">{{ description }}</div>
        <slot />
    </div>
</template>

<style scoped>
</style>
