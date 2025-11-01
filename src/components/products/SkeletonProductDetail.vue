<script>
export default {
    name: 'SkeletonProductDetail'
}
</script>

<template>
    <div class="pd-card pd-skeleton" role="status" aria-live="polite" aria-busy="true">
        <div class="pd-media">
            <div class="pd-media-box">
                <div class="skel skel--media shimmer" />
            </div>
        </div>

        <div class="pd-info">
            <div class="pd-top-content">
                <div class="skel skel--line skel--title-lg shimmer" />
                <div class="skel skel--line skel--title-md shimmer" />

                <div class="pd-sub">
                    <div class="skel skel--pill shimmer" style="width: 120px; height: 16px;" />
                    <div class="skel-dots">
                        <span class="skel skel--dot shimmer" v-for="n in 5" :key="n" />
                    </div>
                </div>

                <div class="skel skel--line shimmer" style="width: 95%;" />
                <div class="skel skel--line shimmer" style="width: 100%;" />
                <div class="skel skel--line shimmer" style="width: 88%;" />
                <div class="skel skel--line shimmer" style="width: 92%;" />
                <button class="read-more-btn skel skel--btn-text shimmer" aria-hidden="true" />
            </div>

            <div class="pd-down-content">
                <hr class="pd-sep" />

                <div class="pd-price-row">
                    <div class="skel skel--price shimmer" />
                </div>

                <div class="pd-actions">
                    <div class="skel skel--btn shimmer" />
                    <div class="skel skel--btn-outline shimmer" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pd-skeleton .skel {
    --skel-base: var(--color-neutral-100, #f2f3f5);
    --skel-highlight: var(--color-neutral-50, #fafafa);
    background: var(--skel-base);
    border-radius: 8px;
}

.shimmer {
    position: relative;
    overflow: hidden;
}

.shimmer::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(90deg,
            transparent,
            rgba(255, 255, 255, 0.45),
            transparent);
    animation: shimmer-move 1.2s infinite;
}

@keyframes shimmer-move {
    100% {
        transform: translateX(100%);
    }
}

@media (prefers-reduced-motion: reduce) {
    .shimmer::after {
        animation: none;
    }
}

.skel--media {
    width: 100%;
    height: 100%;
    border: 1px solid var(--color-border, #eaeaea);
    border-radius: 10px;
}

.skel--line {
    height: 14px;
    margin: 10px 0;
}

.skel--title-lg {
    height: 28px;
    margin-top: 0;
    border-radius: 10px;
}

.skel--title-md {
    height: 18px;
    width: 60%;
    border-radius: 10px;
}

.skel--pill {
    border-radius: 999px !important;
}

.skel-dots {
    display: inline-flex;
    gap: 6px;
    align-items: center;
}

.skel--dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.skel--price {
    width: 140px;
    height: 22px;
    border-radius: 8px;
}

.skel--btn,
.skel--btn-outline {
    height: 40px;
    flex: 1;
    border-radius: 10px;
}

.pd-actions .skel--btn,
.pd-actions .skel--btn-outline {
    min-width: 160px;
}

.skel--btn {
    background: var(--pd-accent, #111);
    opacity: .18;
}

.skel--btn-outline {
    background: transparent;
    box-shadow: inset 0 0 0 2px var(--pd-accent, #111);
    opacity: .25;
}

.skel--btn-text {
    width: 110px;
    height: 16px;
    margin-top: 6px;
    border-radius: 6px;
    background: transparent;
    box-shadow: inset 0 0 0 1px var(--pd-accent-light, #dfe3e6);
}

.pd-card {
    display: flex;
    gap: 16px;
    max-width: 1040px;
    width: 100%;
    align-items: stretch;
    background: var(--color-bg, #fff);
    border: 1px solid var(--color-border, #eaeaea);
    border-radius: 12px;
    box-shadow: 0 10px 26px rgba(0, 0, 0, .08);
}

.pd-media {
    flex: 0 0 33%;
}

.pd-media-box {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background: var(--color-neutral-50, #fafafa);
    border: 1px solid var(--color-border, #eaeaea);
    border-radius: 10px;
}

.pd-info {
    display: flex;
    flex: 1;
    height: 432px;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    align-self: stretch;
}

.pd-top-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.pd-down-content {
    flex-shrink: 0;
    margin-top: 16px;
}

.pd-sub {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--color-border, #eaeaea);
}

@media (max-width: 768px) {
    .pd-card {
        flex-direction: column;
        gap: 12px;
        max-width: 100%;
        width: 100%;
        border-radius: 10px;
        box-shadow: 0 6px 18px rgba(0, 0, 0, .06);
        padding: 12px;
    }

    .pd-media {
        flex: 0 0 auto;
    }

    .pd-media-box {
        height: 280px;
    }

    .pd-info {
        height: auto;
        min-height: 0;
        padding: 8px 4px 0;
        overflow: visible;
    }

    .pd-sep {
        margin: 10px 0 12px;
    }

    .pd-actions .skel--btn,
    .pd-actions .skel--btn-outline {
        min-width: 140px;
    }
}

@media (max-width: 480px) {
    .pd-media-box {
        height: 220px;
        border-radius: 8px;
    }
}
</style>
