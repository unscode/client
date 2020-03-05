<template>
  <div id="app">
    <div class="offline" v-if="offline">Ops! Parece que você está offline, isso é muito triste ...</div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    computed: {
      offline() {
        return this.$store.state.isOffline
      }
    }
  }
</script>

<style lang="scss">
  @import "~bootstrap/scss/functions";
  @import "./assets/styles/variables";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";
  @import "~bootstrap/scss/root";
  @import "~bootstrap/scss/reboot";

  .offline {
    top: 0;
    left: 0;
    padding: 15px 40px;
    background: black;
    font-weight: bold;
    border-bottom-right-radius: 30px;
    color: red;
    position: fixed;
    z-index: 99999;
  }
</style>
