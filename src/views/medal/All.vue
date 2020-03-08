<template>
  <div>
    <navbar/>
    <div class="container">
      <h1 class="title mb-5">Minhas medalha(s)</h1>
      <list/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'All',
    components: {
      Navbar: () => import('../../components/Navbar'),
      List: () => import('../../components/medal/List')
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
