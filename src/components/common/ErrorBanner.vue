<template>
    <div class="err" role="alert">
        <span>{{ message }}</span>
        <button v-if="showRetry" @click="$emit('retry')">Retry</button>
    </div>
</template>

<script>
export default {
    name: 'ErrorBanner',
    props: {
        message: { type: String, default: 'Something went wrong.' },
        showRetry: { type: Boolean, default: true }
    }
}
</script>

<style scoped>
.err {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: center;
    padding: 12px;
    border: 1px solid #f0c;
    background: #fff0f6;
    color: #a1035a;
    border-radius: 8px;
}

.err button {
    background: #a1035a;
    color: #fff;
    border: none;
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
}
</style>
