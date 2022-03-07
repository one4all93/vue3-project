<template>
  <div class="container">

    <!-- <h4>count: {{count}}</h4>
    <h4>double count computed: {{doubleCountComputed}}</h4>
    <h4>double Count method: {{doubleCountMethod()}}</h4>
    <button @click="count++">Add One</button> -->

    <h1>To-Do List</h1>

    <input
      class="form-control"
      type="text" 
      v-model="searchText"
      placeholder="Search"
    >

    <hr>
    
    <TodoSimpleForm @add-todo="addTodo" />
    <div style="color:red">{{ error }}</div>
    
    <div v-if="!filteredTodos.length">
      There is nothing to display
    </div>
    <TodoList 
      :todos="filteredTodos"
      @toggle-todo="toggleTodo" 
      @delete-todo="deleteTodo"
     />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';

export default {
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup() {
    
    const todos = ref([]);
    const error = ref('');

    const getTodos = async () => {
      try{
        const res = await axios.get('http://localhost:3000/todos');
        todos.value = res.data;
      }catch(err){
        error.value = 'Something went Wrong!!';
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
        const res = await axios.post('http://localhost:3000/todos',{
          subject: todo.subject,
          completed: todo.completed,
        });
        // console.log(res);
        todos.value.push(res.data);
      }catch (err){
        error.value = 'Something went Wrong!!';
      }
      // console.log('hello');
    };

    const searchText = ref('');
    const filteredTodos = computed(() =>{
      if(searchText.value){
        return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value);
        });
      }

      return todos.value;
    });

    const toggleTodo = (index) => {
      console.log(todos.value[index]);
      todos.value[index].completed = !todos.value[index].completed
    };

    const deleteTodo = (index) => {
      const id = todos.value[index].id;
      axios.delete('http://localhost:3000/todos');
      todos.value.splice(index, 1);
    };

    // const count = ref(1);
    // const doubleCountComputed = computed(() => {
    //   console.log('computed');
    //   return count.value * 2;
    // });

    // const doubleCountMethod = () => {
    //   console.log('method');
    //   return count.value * 2;
    // };

    return {
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
      searchText,
      filteredTodos,
      error,
      getTodos,
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