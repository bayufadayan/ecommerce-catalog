<template>
    <footer class="footer">
        <small>© {{ new Date().getFullYear() }} FakeStore Demo</small>
    </footer>
</template>
<script>export default { name: 'FooterBar' }</script>
<style scoped>
.footer {
    margin-top: 32px;
    padding: 16px;
    border-top: 1px solid #eee;
    text-align: center;
    color: #666;
}
</style>
