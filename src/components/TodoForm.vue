<template>
  <div v-if="loading">
    Loading...
  </div>
  <form v-else
    @submit.prevent="onSave()"
  >
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>Todo subject</label>
          <input v-model="todo.subject" type="text" class="form-control">
          <div v-if="subjectError" style="color: red">{{subjectError}}</div>
        </div>
      </div>
      <div class="col-6" v-if="editing">
        <div class="form-group">
          <label>Status</label>
          <div>
            <button class="btn btn-success" :class="todo.completed ? 'btn-success' : 'btn-danger'"
            @click="toggleTodoStatus" type="button">
              {{ todo.completed ? 'Completed' : 'Incompleted' }}
            </button>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="form-group">
          <label>Body</label>
          <textarea v-model="todo.body" class="form-control" id="" cols="30" rows="10">

          </textarea>
        </div>
      </div>
    </div>

    <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
        {{ editing ? 'Update' : 'Create' }}
    </button>
    <button class="btn btn-outline-dark ml-2" @click="moveToTodoListPage">
        Cancel
    </button>

  </form>
  <Toast v-if="showToast" :msg="toastMessage" :type="toastAlertType" />

</template>

<script>
import { useRoute , useRouter } from 'vue-router';
import axios from 'axios';
import { ref , computed , onUnmounted } from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/hooks/toast';

export default {
  components: {
    Toast,
  },
  props: {
    editing:{
        type: Boolean,
        default: false,
        body: ''
    }
  },
    setup(props){

        const subjectError = ref('');

        // onBeforeMount(() => {
        //   console.log(document.querySelector('#Seo'));
        // });
        // onMounted(() => {
        //   console.log(document.querySelector('#Seo'));
        // });

        // onBeforeUpdate(() => {
        //   console.log('before updat')
        // });
        // onUpdated(() => {
        //   console.log('updated')
        // });

        // onBeforeUnmount(() => {
        //   console.log('before unmounted')
        // })
        // onUnmounted(() => {
        //   console.log('unmounted')
        // })

        // console.log('hello');

        const {
          toastMessage,
          toastAlertType,
          showToast,
          triggerToast,
        } = useToast();

        const route = useRoute();
        const router = useRouter();
        const todo = ref({
            subject: '',
            completed: false
        });
        const originTodo = ref(null);
        const loading = ref(false);
        const todoId = route.params.id;
        // const timeout = ref(null);
        // const showToast = ref(false);
        // const toastMessage = ref('');
        // const toastAlertType = ref('');

        //메모리 정리할 때
        // onUnmounted(() => {
        //   console.log('unmounted')
        //   clearTimeout(timeout.value);
        // })

        const getTodo = async () => {
            loading.value = true;
          try{
          const res = await axios.get(`http://localhost:3000/todos/${todoId}`);

          console.log(res.data);

          todo.value = { ...res.data } ;
          originTodo.value = { ...res.data } ;
          loading.value = false;
          } catch (error) {
              loading.value = false;
            triggerToast('Something went wrong!!', 'danger');
          }
        }

        const todoUpdated = computed(() => {
          return !_.isEqual(todo.value, originTodo.value);
        })

        const toggleTodoStatus = () => {
          todo.value.completed = !todo.value.completed;
        };

        const moveToTodoListPage = () => {
          router.push({
            name : 'Todos'
          })
        };


        if(props.editing){
            
            getTodo();
        }

        // const triggerToast = (msg, type = 'success') => {
        //   toastMessage.value = msg;
        //   toastAlertType.value = type;
        //   showToast.value = true;
        //   setTimeout(() => {
        //     console.log('hello');
        //     toastMessage.value = '';
        //     toastAlertType.value = '';
        //     showToast.value = false;
        //   }, 5000)
        // }        

        const onSave = async () => {
            subjectError.value = '';
            if(!todo.value.subject){
                subjectError.value = 'Subject is required';
                return;
            }

            try{
                let res;
                const data = {
                    subject: todo.value.subject,
                    completed: todo.value.completed,
                    body : todo.value.body,
                }
                if(props.editing){
                    res = await axios.put(`http://localhost:3000/todos/${todoId}`,data);
                    originTodo.value = {...res.data}; 
                }else{
                    res = await axios.post(`http://localhost:3000/todos`,data);
                    todo.value.subject = '';
                    todo.value.body = '';
                }
                const msg = 'Successfully ' + (props.editing? 'Updated' : 'Created');
                triggerToast(msg);
            } catch (error){
                console.log(error);
                triggerToast('Something went wrong!!', 'danger');
            }
        }

        return {
          todo,
          loading,
          toggleTodoStatus,
          moveToTodoListPage,
          onSave,
          todoUpdated,
          showToast,
          toastMessage,
          toastAlertType,
          subjectError,

        };
    }
}
</script>

<style>

</style>