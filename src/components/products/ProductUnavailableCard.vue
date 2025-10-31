<template>
    <div class="pd-card card-unavailable">
        <div class="unavailable-product-container">
            <figure>
                <img src="@/assets/sad-face.svg" alt="Coming soon" />
            </figure>

            <div class="unavailable-content">
                <p>This product is unavailable to show</p>

                <!-- Tombol Next product -->
                <button class="pd-btn pd-btn--outline unavailable-btn" @click="goNext"
                    :aria-label="`Next product (ID ${nextId})`">
                    Next product
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductUnavailableCard',
    props: {
        currentId: {
            type: Number,
            required: true
        }
    },
    computed: {
        nextId() {
            const cur = Number(this.currentId) || 1
            return (cur % 20) + 1
        }
    },
    methods: {
        goNext() {
            this.$router.push(`/products/${this.nextId}`)
        }
    }
}
</script>

<style scoped>
</style>
