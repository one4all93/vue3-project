<template>
<router-view/>
  <div>

    <!-- <h4>count: {{count}}</h4>
    <h4>double count computed: {{doubleCountComputed}}</h4>
    <h4>double Count method: {{doubleCountMethod()}}</h4>
    <button @click="count++">Add One</button> -->
    <div class="d-flex justify-content-between mb-3">
      <h1>To-Do List</h1>
      <button class="btn btn-primary"
       @click="moveToCreatePage()"
      >Create Todo</button>
    </div>

    <input
      class="form-control"
      type="text" 
      v-model="searchText"
      placeholder="Search"
      @keyup.enter="searchTodo"
    >

    <hr>
    
    <div v-if="!todos.length">
      There is nothing to display
    </div>
    <TodoList 
      :todos="todos"
      @toggle-todo="toggleTodo" 
      @delete-todo="deleteTodo"
    />

    <hr>

    <!-- <PageComponent 
      @currentPage="getTodos"
    /> -->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" v-if="currentPage !== 1">
          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage - 1)">
            Previous
          </a>
        </li>
        <li 
          class="page-item" 
          v-for="page in numberOfPages" 
          :key="page" 
          :class="currentPage === page ? 'active' : ''">
          <a style="cursor: pointer" class="page-link" @click="getTodos(page)">
            {{page}}
          </a>
        </li>
        <li class="page-item" v-if="numberOfPages !== currentPage">
          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage + 1)">
            Next
          </a>
        </li>
      </ul>
    </nav> 

  </div>
  <Toast v-if="showToast" :msg="toastMessage" :type="toastAlertType" />
</template>

<script>
import { ref, computed, watch } from 'vue';
import TodoSimpleForm from '@/components/TodoSimpleForm.vue';
import TodoList from '@/components/TodoList.vue';
import axios from 'axios';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/hooks/toast';
import { useRouter} from 'vue-router';
// import PageComponent from './components/PageComponent.vue';

export default {
  components: {
    TodoList,
    Toast,
    // PageComponent,
  },
  setup() {

    const router = useRouter();
    
    const todos = ref([]);
    const error = ref('');
    const searchText = ref('');

    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);

    const {
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast
    } = useToast();

    // watchEffect(() => {
    //   console.log(currentPage.value);
    //   console.log(numberOfTodos.value);
    // })

    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value/limit);
    });

    // const a = reactive({
    //   b : 1
    // });

    //   watchEffect(() => {
    //     console.log(a.b);
    //   });
    //   a.b = 4;

    // watchEffect(() => {
    //   console.log(numberOfPages.value);
    // })

    const getTodos = async (page=currentPage.value) => {
      currentPage.value = page;
      try{
        const res = await axios.get(
          `http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
        );
        numberOfTodos.value = res.headers['x-total-count'];
        todos.value = res.data;
      }catch(err){
        triggerToast('Something went Wrong!!', 'danger');
        console.log(err);
      }
    }

    getTodos();

    // .then 사용 시
    // const addTodo = (todo) => {
    //   error.value = '';
    //   console.log('start');
    //   // 데이터베이스 투두를 지정
    //   axios.post('http://localhost:3000/todos',{
    //     subject: todo.subject,
    //     completed: todo.completed,
    //   }).then(res =>{
    //     console.log(res);
    //     todos.value.push(res.data);
    //   }).catch(err => {
    //     console.log(err);
    //     error.value = 'Something went Wrong!!';
    //   });
    //   console.log('hello');
    // };

    //await 사용 시
    const addTodo = async (todo) => {
      error.value = '';
      // console.log('start');
      // 데이터베이스 투두를 지정
      try {
          await axios.post('http://localhost:3000/todos',{
          subject: todo.subject,
          completed: todo.completed,
        });
        getTodos(1);
        // console.log(res);
        // todos.value.push(res.data);
      }catch (err){
        triggerToast('Something went Wrong!!', 'danger');
      }
      // console.log('hello');
    };


    let timeout = null;
    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    }
    // 검색창
    watch(searchText, () =>{
      // console.log(current,prev);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getTodos(1);
      }, 2000);
    })
    // const filteredTodos = computed(() =>{
    //   if(searchText.value){
    //     return todos.value.filter(todo => {
    //       return todo.subject.includes(searchText.value);
    //     });
    //   }

    //   return todos.value;
    // });

    //
    const toggleTodo = async (index, checked) => {
      error.value = '';
      const id = todos.value[index].id;
      try{
        await axios.patch('http://localhost:3000/todos/'+ id, {
          completed: checked
        });

        todos.value[index].completed = checked
      }catch(err){
        console.log(err);
        triggerToast('Something went Wrong!!', 'danger');
      }
    };

    const deleteTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.delete('http://localhost:3000/todos/' + id);
        // todos.value.splice(index, 1);
        getTodos(1);
        console.log("axios.delete");
      } catch (err) {
        console.log("TodoSimpleForm.vue_deleteTodo!에러!");
        triggerToast('Something went Wrong!!', 'danger');
        // error.value = 'Something went Wrong!!';
      }
    };

    // const toastMessage = ref('');
    // const toastAlertType = ref('');
    // const showToast = ref(false);
    // const toastTimeout = ref(null);

    // const triggerToast = (msg, type = 'success') => {
    //       toastMessage.value = msg;
    //       toastAlertType.value = type;
    //       showToast.value = true;
    //       toastTimeout.value = setTimeout(() => {
    //         console.log('hello');
    //         toastMessage.value = '';
    //         toastAlertType.value = '';
    //         showToast.value = false;
    //       }, 5000)
    //     } 

    // const count = ref(1);
    // const doubleCountComputed = computed(() => {
    //   console.log('computed');
    //   return count.value * 2;
    // });

    // const doubleCountMethod = () => {
    //   console.log('method');
    //   return count.value * 2;
    // };

    const moveToCreatePage = () => {
      router.push({
        name: 'TodoCreate',
      });
    }

    return {
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
      searchText,
      // filteredTodos,
      error,
      getTodos,
      numberOfPages,
      currentPage,
      searchTodo,
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast,
      moveToCreatePage,

      // count,
      // doubleCountComputed,
      // doubleCountMethod,
    };
  }
}
</script>

<style>
  .todo {
    color: gray;
    text-decoration: line-through;
  }
</style>