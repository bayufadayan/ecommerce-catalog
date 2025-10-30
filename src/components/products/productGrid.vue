<template>
    <div class="grid">
        <!-- Skeleton saat loading -->
        <template v-if="loading">
            <div v-for="n in skeletonCount" :key="'sk-' + n" class="card prod sk">
                <div class="thumb sk-block"></div>
                <div class="sk-line" style="width:90%;"></div>
                <div class="sk-line" style="width:70%; margin-top:6px;"></div>
                <div class="row" style="margin-top:10px;">
                    <div class="sk-pill" style="width:80px; height:16px;"></div>
                    <div class="sk-pill" style="width:50px; height:16px;"></div>
                </div>
            </div>
        </template>

        <!-- Produk nyata -->
        <template v-else>
            <ProductCard v-for="p in items" :key="p.id" :product="p" @select="$emit('select', p)" />
        </template>
    </div>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
    name: 'ProductGrid',
    components: { ProductCard },
    props: {
        items: { type: Array, default: () => [] },
        loading: { type: Boolean, default: false },
        skeletonCount: { type: Number, default: 8 }
    }
}
</script>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
}

@media (min-width: 768px) {
    .grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
}

/* Skeleton */
.sk {
    pointer-events: none;
}

.sk-block,
.sk-line,
.sk-pill {
    position: relative;
    background: #eee;
    border-radius: 10px;
    overflow: hidden;
}

.sk-line {
    height: 12px;
}

.sk-pill {
    border-radius: 999px;
}

.sk-block::after,
.sk-line::after,
.sk-pill::after {
    content: '';
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .6), transparent);
    animation: shimmer 1.1s infinite;
}

@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}
</style>
