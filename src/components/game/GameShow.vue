<template>
  <div>
    <h1 class="fade-in" v-if="game.title">{{game.title}}</h1>
    <pacman v-if="waiting"/>
    <div>
      <h3>Medalha(s) do jogo</h3>
      <div class="players">
        <draggable group="player">
          <div class="player" v-for="medal in game.medals"
               v-bind:key="medal.id">
            <div class="card" v-bind:title="medal.title">
              <div class="card-body">
              <span v-bind:title="medal.title">
                {{medal.title.substring(0, 15)}}...
              </span>
              </div>
            </div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';

  export default {
    name: 'GameShow',
    props: {
      gameId: { // Game
        type: String,
        required: true,
      }
    },
    components: {
      draggable,
      Pacman: () => import('../loaders/Pacman'),
    },
    data() {
      return {
        waiting: false,
        game: {}
      };
    },
    methods: {
      requestGame() {
        this.waiting = true;
        this.$auth.$http.get(`game/${this.gameId}`)
          .then(response => {
            this.game = response.data
              ? response.data.data ? response.data.data : {}
              : {};
          })
          .catch(error => {

          })
          .finally(() => {
            this.waiting = false;
          });
      }
    },
    mounted() {
      // Obtém os dados do jogador do jogo
      this.requestGame();
    }
  };
</script>

<style lang="scss" scoped>
  @import "~bootstrap/scss/functions";
  @import "../../assets/styles/variables";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";
  @import "~bootstrap/scss/card";
  @import "~bootstrap/scss/utilities/spacing";

  .players {
    margin: {
      left: -1%;
      right: -1%;
    };

    .player {
      margin: 1%;
      width: 23%;
      display: inline-block;
    }
  }
</style>
