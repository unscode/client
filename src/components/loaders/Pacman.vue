<template>
  <div class="middle loader-small">
    <div class="loader-inner pacman">
      <div v-for="i in 5" v-bind:key="i"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Pacman'
  };
</script>

<style lang="scss" scoped>
  $primary-color: white;

  @import "../../assets/styles/loaders/animations/pacman.scss";

  .middle {
    text-align: center;

    .pacman {
      display: inline-block;
    }
  }

  .loader-small .loader-inner {
    transform: scale(0.5, 0.5);
  }
</style>
