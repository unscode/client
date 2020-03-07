<template>
  <div class="home">
    <Navbar/>
    <div class="container">
      <HelloWorld msg="Welcome"/>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Navbar from '../components/Navbar';
  import HelloWorld from '@/components/HelloWorld.vue';

  export default {
    name: 'Home',
    components: {
      Navbar,
      HelloWorld,
    },
  };
</script>

<style lang="scss" scoped>
  @import "~bootstrap/scss/functions";
  @import "../assets/styles/variables";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";
  @import "~bootstrap/scss/buttons";
  @import "~bootstrap/scss/grid";
</style>
