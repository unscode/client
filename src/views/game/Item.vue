<template>
  <div>
    <navbar/>
    <div class="container mt-5">
      <Show/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Item',
    components: {
      Navbar: () => import('../../components/Navbar'), // Lazy Loading a Component ...
      Show: () => import('../../components/game/Show'), // Lazy Loading a Component ...
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
