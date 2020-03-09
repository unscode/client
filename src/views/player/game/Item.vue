<template>
  <div>
    <navbar/>
    <div class="container">
      <ranking
        v-bind:gameId="$route.params.game"
        v-if="$route.params.game"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Item',
    components: {
      Navbar: () => import('../../../components/Navbar'),
      Ranking: () => import('../../../components/game/Ranking')
    },
  };
</script>

<style lang="scss" scoped>
  @import "~bootstrap/scss/functions";
  @import "../../../assets/styles/variables";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";
  @import "~bootstrap/scss/grid";
  @import "~bootstrap/scss/utilities/spacing";
</style>
