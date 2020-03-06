<template>
  <div>
    <navbar/>
    <div class="container">
      <div class="mb-5">
        <player-show
          v-bind:gameId="$route.params.game"
          v-bind:playerId="$route.params.player"
        />
      </div>
      <div class="mb-5">
        <game-show
          v-bind:gameId="$route.params.game"
        />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Item',
    components: {
      Navbar: () => import('../../../components/Navbar'),
      GameShow: () => import('../../../components/game/GameShow'),
      PlayerShow: () => import('../../../components/game/player/PlayerShow')
    },
    data() {
      return {};
    },
    methods: {},
    mounted() {

    }
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
