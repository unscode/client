<template>
  <div class="mt-1 mb-1">
    <div class="card"></div>
  </div>
</template>

<script>
  export default {
    name: 'Show',
    data() {
      return {
        waiting: false,
        game: null
      };
    },
    methods: {
      getGame() {

      }
    },
    mounted() {
      this.getGame();
    }
  };
</script>

<style lang="scss" scoped>

</style>
