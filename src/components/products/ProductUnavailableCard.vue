<template>
    <div class="pd-card">
        <div class="unavailable-product-container">
            <figure>
                <img src="@/assets/sad-face.svg" alt="Coming soon" />
            </figure>

            <div class="unavailable-content">
                <p>This product is unavailable to show</p>
                <router-link class="pd-btn pd-btn--outline unavailable-btn" to="/products">
                    Next product
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductUnavailableCard',
}
</script>

<style scoped></style>