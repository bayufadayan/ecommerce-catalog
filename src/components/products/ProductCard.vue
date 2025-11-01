<script>
import { formatPrice } from '@/utils/format'

export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    methods: {
        formatPrice,
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

<template>
    <article class="pc-card" @click="open">
        <div class="pc-thumb">
            <img :src="product.image" :alt="product.title" loading="lazy" @error="onImgErr" />
        </div>
        <div class="pc-meta">
            <h3 class="pc-title" :title="product.title">
                {{ product.title }}
            </h3>
            <div class="pc-line">
                <span class="pc-price">{{ formatPrice(product.price) }}</span>
                <span class="pc-rating" v-if="product.rating && product.rating.rate">
                    ★ {{ product.rating.rate.toFixed(1) }}
                </span>
            </div>
        </div>
    </article>
</template>


