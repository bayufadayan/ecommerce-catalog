<template>
    <article class="card" @click="open">
        <div class="thumb">
            <img :src="product.image" :alt="product.title" loading="lazy" @error="onImgErr" />
        </div>
        <div class="meta">
            <h3 class="title" :title="product.title">{{ product.title }}</h3>
            <div class="line">
                <span class="price">{{ formatIDR(product.price) }}</span>
                <span class="rating" v-if="product.rating && product.rating.rate">
                    ★ {{ product.rating.rate.toFixed(1) }}
                </span>
            </div>
        </div>
    </article>
</template>

<script>
import { formatIDR } from '@/utils/format'

export default {
    name: 'ProductCard',
    props: { product: { type: Object, required: true } },
    methods: {
        formatIDR,
        open() {
            this.$router.push(`/products/${this.product.id}`)
        },
        onImgErr(e) {
            e.target.src =
                'data:image/svg+xml;utf8,' +
                encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
          <rect width="100%" height="100%" fill="#f3f3f3"/>
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="14" fill="#999">No Image</text>
        </svg>`)
        }
    }
}
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 10px;
    background: #fff;
    cursor: pointer;
}

.card:hover {
    box-shadow: 0 3px 20px rgba(0, 0, 0, .06);
}

.thumb {
    width: 100%;
    height: 160px;
    background: #fafafa;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.thumb img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.meta .title {
    font-size: 14px;
    line-height: 1.35;
    max-height: 3.6em;
    overflow: hidden;
}

.line {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.price {
    font-weight: 800;
}

.rating {
    font-size: 12px;
    color: #666;
}
</style>
