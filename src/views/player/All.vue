<template>
  <div>
    <navbar/>
    <div class="container">
      <list/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'All',
    components: {
      Navbar: () => import('../../components/Navbar'),
      List: () => import('../../components/player/List')
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
