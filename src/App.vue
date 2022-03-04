<template>
  <input 
    type="text" 
    v-model="name"
    >
  <button 
    class="btn btn-primary" 
    @click="onSubmit">
  Click
  </button>
</template>

<script>
import { ref } from 'vue';

export default {
  setup(){
    // let name = '루페온_CodeSolver_블래스터';
    const name = ref('CodeSolver');

    const onSubmit = () => {
      console.log(name.value);
    };

    // const updateName = (e) =>{
    //   name.value = e.target.value;
    // };
    // const name = ref({
    //   id : 1
    // });

    // const greeting = (name) => {
    //   return 'Hello, ' + name;
    // };

    // const greet = greeting(name);

    const type = ref('number');
    const nameClass = ref('');

    // const updateName= () => {
    //   // name = '검은매_CodeSolver';
    //   // name.value = "이건 바뀐거야~";
    //   // // console.log(name);
    //   // type.value = 'text';
    //   // nameClass.value = 'name';
    // }

    return {
      name,
      // updateName,
      type,
      nameClass,
      onSubmit,
    };
  }
}
</script>

<style>
  .name {
    color:aquamarine;
  }
</style>
