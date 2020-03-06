<template>
  <div class="detail">
    <h4 class="title">Ops</h4>
    <div class="player">
      <div class="scores"></div>
      <div class="medals"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PlayerDetail',
    game: {
      type: Number,
      required: true,
    },
    player: {
      type: Number,
      required: true
    }
  };
</script>

<style lang="scss" scoped>
  .detail {
    padding: 10px;
    bottom: 0;
    left: 0;
    width: 100%;
    background: black;
    position: fixed;
    z-index: 9;
    overflow-x: scroll;
  }

  .player {
    .scores {
      min-width: 20px;
      min-height: 20px;
      background: yellow;
      display: inline-block;
    }
  }
</style>
