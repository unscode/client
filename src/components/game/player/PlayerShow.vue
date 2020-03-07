<template>
  <div>
    <h1 class="fade-in" v-if="player.name">{{player.name}}</h1>
    <pacman v-show="waiting"/>
    <!-- Medals -->
    <div>
      <h3>Medalha(s) do jogador</h3>
      <!-- Player Medals -->
      <div class="medals">
        <draggable v-model="player.medals"
                   v-bind:group="{name: 'medal'}"
                   @add="attachMedal"
        >
          <div class="medal"
               v-for="medal in player.medals"
               v-bind:key="medal.created_at"
          >
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
      <!-- Trash Medals -->
      <div class="remove"
           v-if="player.medals ? player.medals.length : false"
      >
        <div class="trash"
             @add="trashMedal"
        >
          <draggable class="trash"
                     v-bind:group="{name: 'medal'}"
          >
            <div class="icon">
              <i class="gg-trash"></i>
            </div>
          </draggable>
        </div>
      </div>
    </div>
    <!-- Score -->
    <div>
      <h3>Ponto(s) do jogador</h3>
      <!-- Player Scores -->
      <div class="scores">
        <draggable v-model="player.scores"
                   v-bind:group="{name:'score'}"
                   @add="attachScore"
        >
          <div class="score"
               v-for="score in player.scores"
               v-bind:key="score.created_at"
          >
            <div class="card" v-bind:title="score.name">
              <div class="card-body">
                <span v-bind:title="score.title">
                  {{score.title.substring(0, 15)}}...
                </span>
              </div>
            </div>
          </div>
        </draggable>
      </div>
      <!-- Trash Scores -->
      <div class="remove"
           v-if="player.scores ? player.scores.length: false"
      >
        <div class="trash"
             @add="trashScore"
        >
          <draggable class="trash"
                     v-bind:group="{name:'score'}"
          >
            <div class="icon">
              <i class="gg-trash"></i>
            </div>
          </draggable>
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
      },
      storePlayerMedal(medalId) {
        this.waiting = true;
        const data = { id: medalId };
        this.$auth.$http.post(`game/${this.gameId}/player/${this.playerId}/medal`, data)
          .then(response => {
            this.requestPlayer();
          })
          .catch(error => {

          })
          .finally(() => {
            this.waiting = false;
          });
      },
      detroyPlayerMedal(medalId) {
        this.waiting = true;
        const data = { id: medalId };
        this.$auth.$http.delete(`game/${this.gameId}/player/${this.playerId}/medal/${medalId}`)
          .then(response => {
            this.requestPlayer();
          })
          .catch(error => {

          })
          .finally(() => {
            this.waiting = false;
          });
      },
      attachMedal(e) {
        this.storePlayerMedal(this.player.medals[e.newIndex].id);
      },
      trashMedal(e) {
        this.detroyPlayerMedal(this.player.medals[e.newIndex].id);
      },
      attachScore(e) {
      },
      trashScore(e) {

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
  // Icons
  @import "~css.gg/icons/trash.css";

  .card {
    background-color: #000000;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0' gradientTransform='rotate(96,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%230FF'/%3E%3Cstop offset='1' stop-color='%23CF6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(84,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23F00'/%3E%3Cstop offset='1' stop-color='%23FC0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='7.919999999999999'%3E%3Cpath transform='translate(-103.25 6.800000000000001) rotate(-0.25 1409 581) scale(0.95277)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='2.64' transform='translate(-122 77) rotate(8.1 800 450) scale(1.00864)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(21.299999999999997 -96) rotate(66 401 736) scale(1.00864)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='2.4'%3E%3Cpath transform='translate(462 -0.8000000000000007) rotate(0.20000000000000018 150 345) scale(0.98159)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='5.28' transform='translate(-143 -207.5) rotate(61.19999999999999 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='translate(-294 82) rotate(10.2 1400 132) scale(0.85)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    cursor: pointer;
  }

  .remove {
    text-align: right;

    .trash {
      margin-top: 15px;
      display: inline-block;

      > .trash {
        padding: 5px;
        width: 100%;
        height: auto;
        background: $danger;
        border-radius: $border-radius;
        border: 1px solid $danger;
        display: inline-block;

        .icon {
          padding: 10px 30px 8px 30px;
          display: inline-block;
        }
      }
    }
  }

  .medals,
  .scores {
    margin: {
      left: -1%;
      right: -1%;
    };

    .medal,
    .score {
      margin: 1%;
      width: 92%;
      display: inline-block;
      @media (min-width: map_get($grid-breakpoints, 'md')) {
        width: 56%;
      }
      @media (min-width: map_get($grid-breakpoints, 'lg')) {
        width: 23%;
      }
    }
  }
</style>
