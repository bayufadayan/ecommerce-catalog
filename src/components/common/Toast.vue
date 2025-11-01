<script>
export default {
    name: 'ToastView',
    props: {
        text: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            visible: false,
            message: this.text,
            timer: null
        }
    },
    methods: {
        show(msg = this.message, ms = 2000) {
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

<template>
    <div v-if="visible" class="toast">
        {{ message }}
    </div>
</template>