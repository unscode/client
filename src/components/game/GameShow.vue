<template>
  <div>
    <h1 class="fade-in"
        v-if="game.title"
        v-bind:title="game.title"
    >
      {{game.title.substring(0, 50)}}...
    </h1>
    <pacman v-if="waiting"/>
    <!-- Medals -->
    <div>
      <h3>Medalha(s) do jogo</h3>
      <button @click="toggleMedals">Mostrar</button>
      <div class="medals" v-show="showMedals">
        <draggable v-model="game.medals"
                   v-bind:group="{name: 'medal', pull: 'clone', put: false}"
        >
          <div class="medal" v-for="medal in game.medals"
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
    <!-- Scores -->
    <div>
      <h3>Pontos(s) do jogo</h3>
      <button @click="toggleScores">Mostrar</button>
      <div class="medals" v-show="showScores">
        <draggable v-model="game.scores"
                   v-bind:group="{name: 'score', pull: 'clone', put: false}"
        >
          <div class="medal" v-for="score in game.scores"
               v-bind:key="score.id">
            <div class="card" v-bind:title="score.title">
              <div class="card-body">
                <span v-bind:title="score.title">
                  {{score.title.substring(0, 15)}}...
                </span>
                <p>
                  {{score.value}}
                </p>
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
        showMedals: false,
        showScores: false,
        game: {}
      };
    },
    methods: {
      toggleMedals() {
        this.showMedals = !this.showMedals;
      },
      toggleScores() {
        this.showScores = !this.showScores;
      },
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
      },
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

  .card {
    cursor: pointer;
  }

  .medals {
    margin: {
      left: -1%;
      right: -1%;
    };

    .medal {
      margin: 1%;
      width: 23%;
      display: inline-block;
    }
  }
</style>
