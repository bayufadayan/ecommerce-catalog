<template>
    <div class="pf-skel">
        <!-- PANEL KIRI -->
        <div class="panel">
            <!-- HEAD -->
            <div class="head">
                <div class="avatar skel"></div>
                <div class="ident">
                    <div class="bar bar-lg skel"></div>
                    <div class="bar bar-sm skel"></div>
                </div>
            </div>

            <!-- GRID ITEM (VIEW MODE LOOK) -->
            <div class="grid">
                <div class="item">
                    <div class="bar bar-xs skel mb4"></div>
                    <div class="bar bar-md skel"></div>
                </div>
                <div class="item">
                    <div class="bar bar-xs skel mb4"></div>
                    <div class="bar bar-md skel"></div>
                </div>
                <div class="item span2">
                    <div class="bar bar-xs skel mb4"></div>
                    <div class="bar bar-md skel mb4"></div>
                    <div class="bar bar-sm skel w-50"></div>
                </div>
                <div class="item">
                    <div class="bar bar-xs skel mb4"></div>
                    <div class="bar bar-md skel"></div>
                </div>
                <div class="item">
                    <div class="bar bar-xs skel mb4"></div>
                    <div class="bar bar-md skel"></div>
                </div>
            </div>

            <!-- ACTIONS -->
            <div class="actions">
                <div class="btn-skel skel"></div>
                <div class="btn-skel skel"></div>
                <div class="btn-skel ghost skel"></div>
            </div>
        </div>

        <!-- PANEL KANAN -->
        <aside class="panel side">
            <div class="line">
                <span class="bar bar-xs skel w-35"></span>
                <strong class="bar bar-sm skel w-45"></strong>
            </div>
            <div class="line">
                <span class="bar bar-xs skel w-35"></span>
                <strong class="bar bar-sm skel w-30"></strong>
            </div>
            <div class="line">
                <span class="bar bar-xs skel w-35"></span>
                <strong class="bar bar-sm skel w-55"></strong>
            </div>
            <div class="line">
                <span class="bar bar-xs skel w-35"></span>
                <strong class="bar bar-sm skel w-25"></strong>
            </div>
        </aside>
    </div>
</template>

<script>
export default {
    name: 'ProfileSkeleton'
}
</script>

<style scoped>
/* Layout mengikuti pola .pf kamu */
.pf-skel {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 24px;
}

/* Panel dasar (tanpa rounded) */
.panel {
    border: 1px solid var(--color-border, #e5e5e5);
    padding: 16px;
    background: var(--color-neutral-50, #fafafa);
    box-shadow: none;
}

/* Head */
.head {
    display: flex;
    gap: 16px;
    align-items: center;
    margin-bottom: 16px;
}

.avatar {
    width: 56px;
    height: 56px;
    background: #e9e9e9;
    border: 1px solid var(--color-border, #e5e5e5);
}

.ident {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

/* Grid item seperti view-mode */
.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 8px;
}

.item {
    border: 1px solid var(--color-border, #e5e5e5);
    padding: 12px;
    background: var(--color-primary-light, #ffffff);
}

.item.span2 {
    grid-column: span 1;
    /* di mobile tetap 1 kolom */
}

/* Actions row */
.actions {
    margin-top: 16px;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

/* Side (kanan) */
.side {
    position: sticky;
    top: 70px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
}

.line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid var(--color-border, #e5e5e5);
}

.line:last-child {
    border-bottom: none;
}

/* ===== Skeleton base + shimmer ===== */
.skel {
    position: relative;
    overflow: hidden;
    background: #eee;
}

.skel::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, .6) 50%, rgba(255, 255, 255, 0) 100%);
    animation: shimmer 1.2s infinite;
}

@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}

/* Bars */
.bar {
    height: 12px;
    background: #eaeaea;
}

.bar-lg {
    height: 18px;
    width: 220px;
}

.bar-md {
    height: 14px;
    width: 60%;
}

.bar-sm {
    height: 12px;
    width: 40%;
}

.bar-xs {
    height: 10px;
    width: 90px;
}

.mb4 {
    margin-bottom: 6px;
}

/* width modifiers */
.w-25 {
    width: 25%;
}

.w-30 {
    width: 30%;
}

.w-35 {
    width: 35%;
}

.w-45 {
    width: 45%;
}

.w-50 {
    width: 50%;
}

.w-55 {
    width: 55%;
}

/* Button skeletons (tanpa rounded) */
.btn-skel {
    height: 36px;
    width: 140px;
    border: 1px solid var(--color-border, #e5e5e5);
    background: var(--color-neutral-50, #fafafa);
}

.btn-skel.ghost {
    width: 180px;
}

/* Responsive mengikuti layout profile */
@media (min-width: 960px) {
    .pf-skel {
        grid-template-columns: 2fr 1fr;
    }

    .grid {
        grid-template-columns: 1fr 1fr;
    }

    .item.span2 {
        grid-column: span 2;
    }
}
</style>
