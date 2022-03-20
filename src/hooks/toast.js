import { ref , onUnmounted } from 'vue';

export const useToast = () => {

    const toastMessage = ref('');
    const toastAlertType = ref('');
    const showToast = ref(false);
    const timeout = ref(null);

    const triggerToast = (msg, type = 'success') => {
        toastMessage.value = msg;
        toastAlertType.value = type;
        showToast.value = true;
        timeout.value = setTimeout(() => {
          console.log('hello');
          toastMessage.value = '';
          toastAlertType.value = '';
          showToast.value = false;
        }, 5000)
    } 

    onUnmounted(() => {
        console.log('unmounted')
        clearTimeout(timeout.value);
      })

    return {
        toastMessage,
        toastAlertType,
        showToast,
        triggerToast,
        onUnmounted,

    }
}