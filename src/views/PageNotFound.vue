<template>
  <div>
    <navbar/>
    <div class="container">
      <h1>Ops!</h1>
      <h2>Parece que você está perdido</h2>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PageNotFound',
    components: {
      Navbar: () => import('../components/Navbar'), // Lazy Loading a Component ...
    }
  };
</script>

<style lang="scss" scoped>
  @import "~bootstrap/scss/functions";
  @import "../assets/styles/variables";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";
  @import "~bootstrap/scss/grid";
  @import "~bootstrap/scss/card";
  @import "~bootstrap/scss/utilities/spacing";

  h1 {
    font-size: 4rem;
  }

  h2 {
    font-size: 3rem;
  }
</style>
