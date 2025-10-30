<script>
export default {
    name: 'LogoComponent',
}
</script>

<template>
    <figure class="logo" role="img" aria-label="BayStore logo">
        <span class="logo-mark" aria-hidden="true"></span>
        <figcaption class="logo-text">Bay<span>Store</span></figcaption>
    </figure>
</template>

<style scoped>
.logo {
    margin: 0;
    padding: 0;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding-block: 12px;
}

.logo-mark {
    width: 44px;
    height: 32px;
    border-radius: 12px;
    position: relative;
    display: inline-block;
    background: linear-gradient(135deg, #4f7cff, #00c2ff 55%, #7b4dff);
    box-shadow: 0 6px 14px rgba(15, 39, 66, .15);
}

.logo-mark::before {
    content: "";
    position: absolute;
    left: 50%;
    top: -8px;
    transform: translateX(-50%);
    width: 28px;
    height: 16px;
    border: 4px solid #eaf1ff;
    border-bottom: none;
    border-radius: 14px 14px 0 0;
}

.logo-mark::after {
    content: "";
    position: absolute;
    inset: 8px 8px 10px;
    border-radius: 9px;
    background: radial-gradient(circle at 35% 30%, rgba(255, 255, 255, .8), rgba(255, 255, 255, 0) 45%);
}

.logo-text {
    font-size: 26px;
    line-height: 1;
    font-weight: 750;
    color: #2C2C2C;
}

.logo-text span {
    background: linear-gradient(90deg, #4f7cff, #00c2ff, #7b4dff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: 600;
}

.logo:hover .logo-mark {
    transform: translateY(-2px);
}
</style>