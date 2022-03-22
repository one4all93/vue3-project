<template>
  <div>Home Page</div>
  <div>{{ count }}</div>
  <button @click="count++" class="btn btn-primary">Add</button>
</template>

<script>
import { useCount } from '@/hooks/count.js';

export default {
  setup(){
    const { count } = useCount();
    console.log(count);

    return{
      count
    }
  }
}
</script>

<style>

</style>