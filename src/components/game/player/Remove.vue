<template>
  <router-link v-bind:to="{name: 'game.item.player.item', params: { game: g.id, player: p.id } }">
    <div class="card mb-2" v-bind:class="{vibrate: waiting}">
      <div class="card-body">
        {{player.name}}
        <button class="btn btn-sm btn-outline-danger"
                @click="remove"
        >
          Remover do jogo
        </button>
      </div>
    </div>
  </router-link>
</template>

<script>
  export default {
    name: 'PlayerRemove',
    props: {
      g: { // Game
        type: Object,
        required: true
      },
      p: { // Player
        type: Object,
        required: true
      }
    },
    data() {
      return {
        waiting: false,
        game: {},
        player: {}
      };
    },
    methods: {
      remove() {
        this.waiting = true;
        this.$auth.$http.delete(`game/${this.game.id}/player/${this.player.id}`)
          .then(response => {
            this.$delete(this.game.players, this.player.id);
          })
          .catch(error => {
          })
          .finally(() => {
            this.waiting = false;
          });
      }
    },
    mounted() {
      this.game = this.g;
      this.player = this.p;
    }
  };
</script>

<style lang="scss" scoped>
  @import "~bootstrap/scss/functions";
  @import "../../../assets/styles/variables";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";
  @import "~bootstrap/scss/grid";
  @import "~bootstrap/scss/card";
  @import "~bootstrap/scss/buttons";
  @import "~bootstrap/scss/images";
  @import "~bootstrap/scss/utilities/spacing";

  @keyframes vibrate {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(-2px, -2px);
    }
    60% {
      transform: translate(2px, 2px);
    }
    80% {
      transform: translate(2px, -2px);
    }
    100% {
      transform: translate(0);
    }
  }

  .vibrate {
    animation: vibrate 0.3s linear infinite both;
  }
</style>
