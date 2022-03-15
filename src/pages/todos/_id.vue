<template>
  <h1>To-Do Page</h1>
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
        </div>
      </div>
      <div class="col-6">
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
    </div>

    <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
        Save
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
import { ref , computed } from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';

export default {
  components: {
    Toast,
  },
    setup(){
        const route = useRoute();
        const router = useRouter();
        const todo = ref(null);
        const originTodo = ref(null);
        const loading = ref(true);
        const showToast = ref(false);
        const toastMessage = ref('');
        const todoId = route.params.id;
        const toastAlertType = ref('');

        const getTodo = async () => {
          try{
          const res = await axios.get(`http://localhost:3000/todos/${todoId}`);

          console.log(res.data);

          todo.value = { ...res.data } ;
          originTodo.value = { ...res.data } ;
          loading.value = false;
          } catch (error) {
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



        getTodo();

        const triggerToast = (msg, type = 'success') => {
          toastMessage.value = msg;
          toastAlertType.value = type;
          showToast.value = true;
          setTimeout(() => {
            toastMessage.value = '';
            toastAlertType.value = '';
            showToast.value = false;
          }, 5000)
        }        

        const onSave = async () => {
          try{
          const res = await axios.put(`http://localhost:3000/todos/${todoId}`,{
            subject: todo.value.subject,
            completed: todo.value.completed
          });

          originTodo.value = {...res.data};
          triggerToast('Successfully saved!!');
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

        };
    }
}
</script>

<style>

</style>