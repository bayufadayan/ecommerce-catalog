<script>
export default {
    name: 'SkeletonCard'
}
</script>

<template>
    <div class="s-card" aria-hidden="true">
        <div class="s-thumb shimmer"></div>
        <div class="s-line shimmer"></div>
        <div class="s-line short shimmer"></div>
    </div>
</template>


<style scoped>
.s-card {
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 10px;
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.s-thumb {
    height: 160px;
    background: #f3f3f3;
    border-radius: 8px;
}

.s-line {
    height: 14px;
    background: #f3f3f3;
    border-radius: 6px;
}

.s-line.short {
    width: 60%;
}

.shimmer {
    position: relative;
    overflow: hidden;
}

.shimmer::after {
    content: '';
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, .6), rgba(255, 255, 255, 0));
    animation: shimmer 1.25s infinite;
}

@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}
</style>
