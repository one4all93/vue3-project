<template>

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

</template>

<script>
import { ref , computed } from 'vue';

export default {
    emits: ['currentPage','numberOfTodos','limit'],
    setup(props, {emit}){
        const currentPage = emit('currentPage', ref(1));
        const numberOfTodos = emit('numberOfTodos', ref(0));
        const limit = emit('limit', 5);

        const numberOfPages = computed(() => {
            return Math.ceil(numberOfTodos.value/limit);
        });

        return {
            numberOfTodos,
            limit,
            currentPage,
            numberOfPages,
        }
    }
}
</script>

<style>

</style>