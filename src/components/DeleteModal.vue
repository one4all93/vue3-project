<template>
  <Modal>
    <!--    v-on: => @
            v-bind: => :
            v-slot: => # 
    -->
    <template #title>
        Delete Todo
    </template>
    <template #body>
        Are U sure U want to delete this todo?
    </template>
    <template #footer>
        <button 
            type="button" 
            class="btn btn-secondary"
            @click="onClose"
        >
        Close
        </button>
        <button 
            type="button" 
            @click="onDelete" 
            class="btn btn-danger"
        >
        Delete Todo
        </button>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
    components: {
        Modal,
    },
    setup(props, {emit}){
        const onClose = () => {
            emit('close');
        }
        const onDelete = () => {
            emit('delete');
        }

       return{
            onClose,
            onDelete,

       }
    }
}
</script>

<style>

</style>