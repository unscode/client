<template>
  <div class="box" ref="box">
    <h2>Jogadore(s)</h2>
    <div class="players">
      <div v-for="player in players" v-bind:key="player.id">
        <div class="player">{{player.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Draggable } from '@shopify/draggable';

  export default {
    name: 'PlayerList',
    props: {
      game: {},
      players: {
        type: Object,
        required: true
      }
    },
    mounted() {
      new Draggable(this.$refs.players, {
        draggable: '.player'
      });
    }
  };
</script>

<style lang="scss" scoped>
  @import "~bootstrap/scss/functions";
  @import "../../../assets/styles/variables";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";

  .box {
    top: 0;
    bottom: 0;
    width: 100%;
    height: auto;
    background: black;
    position: fixed;
    z-index: 9999;

    .players {
      display: flex;

      .player {
        margin-bottom: 5px;
        padding: 10px 15px;
        border-radius: $border-radius;
        background: black;
        cursor: pointer;
      }
    }
  }

  .draggable--original {
    background: yellow;
  }
</style>
