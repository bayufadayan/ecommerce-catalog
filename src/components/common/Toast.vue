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
