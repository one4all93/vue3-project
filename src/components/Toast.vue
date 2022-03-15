<template>
    <div class="alert toast-box" role="alert" :class="`alert-${type}`">
        {{ msg }}
    </div>
</template>

<script>
export default {
    props: {
        msg: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'success'
        }
    }

}
</script>

<style>
    .toast-box {
        position: fixed;
        top: 10px;
        right: 10px;
    }
</style>