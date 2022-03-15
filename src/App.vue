<template>

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <router-link class="navbar-brand" :to="{ name: 'Home'}"><b>CodeSolver_Todo</b></router-link>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" :to="{ name: 'Home'}">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" :to="{ name: 'Todos'}">Todos</router-link>
        </li>
      </ul>

    </div>
  </div>
</nav>

<br>

<!-- 라우터 뷰 -->
<div class="container">
  <router-view/>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>