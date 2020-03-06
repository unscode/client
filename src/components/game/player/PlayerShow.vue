<template>
  <div>
    <h1 class="fade-in" v-if="player.name">{{player.name}}</h1>
    <pacman v-show="waiting"/>
    <div class="row">
      <div class="col-12">
        <h3>Medalha(s) do jogador</h3>
      </div>
      <div v-if="player.medals">
        <div class="col-12 col-md-4 col-lg-4 col-xl-4"
             v-for="medal in player.medals"
             v-bind:key="medal.id">
          <div class="card">
            <div class="card-body">

            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div>
          <div class="players">
            <draggable group="player">
              <div class="player" v-for="medal in player.medals"
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
    </div>
    <div class="row">
      <div class="col-12">
        <h3>Pontos(s) do jogador</h3>
      </div>
      <div v-if="player.scores">
        <div class="col-12 col-md-4 col-lg-4 col-xl-4"
             v-for="score in player.scores"
             v-bind:key="score.id">
          <div class="card">
            <div class="card-body">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';

  export default {
    name: 'PlayerShow',
    props: {
      gameId: { // Game
        type: String,
        required: true,
      },
      playerId: { // Game / Player
        type: String,
        required: true,
      }
    },
    components: {
      draggable,
      Pacman: () => import('../../loaders/Pacman'),
    },
    data() {
      return {
        waiting: false,
        player: {}
      };
    },
    methods: {
      requestPlayer() {
        this.waiting = true;
        this.$auth.$http.get(`game/${this.gameId}/player/${this.playerId}`)
          .then(response => {
            this.player = response.data
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
      this.requestPlayer();
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
  @import "~bootstrap/scss/utilities/spacing";
  // Animation
  @import "../../../assets/styles/animations";

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
