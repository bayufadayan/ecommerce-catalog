<template>
    <article class="card prod" @click="$emit('select', product)">
        <div class="thumb">
            <img :src="product.image" :alt="product.title" loading="lazy" />
        </div>

        <div class="title" :title="product.title">
            {{ product.title }}
        </div>

        <div class="row">
            <div class="price">{{ formatIDR(product.price) }}</div>
            <div class="rating">★ {{ product.rating?.rate || 0 }}</div>
        </div>
    </article>
</template>

<script>
import { formatIDR } from '@/utils/format'

export default {
    name: 'ProductCard',
    props: {
        product: { type: Object, required: true }
    },
    methods: { formatIDR }
}
</script>

<style scoped>
.card.prod {
    cursor: pointer;
    transition: transform .08s ease;
}

.card.prod:hover {
    transform: translateY(-2px);
}

.thumb {
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fafafa;
    border-radius: 10px;
    margin-bottom: 10px;
    overflow: hidden;
}

img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
}

.title {
    font-weight: 600;
    font-size: 14px;
    line-height: 1.35;
    height: 38px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 8px;
}

.row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.price {
    font-weight: 700;
}

.rating {
    font-size: 13px;
    color: #555;
}
</style>
