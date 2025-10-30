<script>
export default {
    name: 'BackButton',
    methods: {
        goBack() {
            this.$router.back()
        }
    }
}
</script>

<template>
    <button class="btn-back" @click="goBack">
        <FaIcon icon="arrow-left" class="icon" />
        <span>Kembali</span>
    </button>
</template>

<style scoped>
</style>