<template>
  <div class="home">
    <Navbar/>
    <div class="container">
      <HelloWorld msg="Welcome"/>
    </div>
  </div>
</template>

<style lang="scss">
  @import "../assets/styles/app";
</style>

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
