<template>
    <div v-if="visible" class="toast">{{ message }}</div>
</template>

<script>
export default {
    name: 'ToastView',
    props: {
        // opsional: text default saat dipasang
        text: { type: String, default: '' }
    },
    data() {
        return {
            visible: false,
            message: this.text, // copy awal dari prop (tidak diubah lagi)
            timer: null
        }
    },
    methods: {
        show(msg = this.message, ms = 2000) {
            // jangan ubah prop; ubah state internal
            this.message = msg
            this.visible = true
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.visible = false
            }, ms)
        }
    },
    beforeDestroy() {
        clearTimeout(this.timer)
    }
}
</script>

<style scoped>
.toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #111;
    color: #fff;
    padding: 10px 14px;
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, .2);
}
</style>
