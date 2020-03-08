<template>
  <div>
    <navbar/>
    <div class="container">
      <h1 class="title mb-5">Meus jogos</h1>
      <List/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'All',
    components: {
      Navbar: () => import('../../components/Navbar'), // Lazy Loading a Component ...
      List: () => import('../../components/game/List') // Lazy Loading a Component ...
    }
  };
</script>

<style lang="scss" scoped>
  @import "~bootstrap/scss/functions";
  @import "../../assets/styles/variables";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";
  @import "~bootstrap/scss/grid";
</style>
