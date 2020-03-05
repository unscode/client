<template>
  <div class="container mt-5">
    <h1>Meus jogos</h1>
    <div class="row">
      <div class="col-12">
        <Create/>
      </div>
    </div>
    <List/>
  </div>
</template>

<script>
  export default {
    name: 'All',
    components: {
      Create: () => import('../../components/game/Create'), // Lazy Loading a Component ...
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
  @import "~bootstrap/scss/utilities/spacing";
</style>
