<template>
  <div class="row">
    <div class="col-12">
      <Pacman v-if="waiting"/>
    </div>
    <div class="col-12 col-xl-8">
      <div class="mt-1 mb-1">
        <h2>Detalhe(s) do jogo</h2>

        <div class="card" v-if="!waiting">
          <div class="card-header">
            <h3>{{game.title}}</h3>
            <h4>{{game.description}}</h4>
            <Update v-bind:g="game"/>
          </div>
          <div class="card-body pt-1 pt-1">
            <div class="row">
              <div class="col-12 col-xl-4">
                Medalhas(s) {{Object.getOwnPropertyNames(game.medals).length}}
              </div>
              <div class="col-12 col-xl-4">
                Jogadore(s) {{Object.getOwnPropertyNames(game.players).length}}
              </div>
              <div class="col-12 col-xl-4">
                Ponto(s) {{Object.getOwnPropertyNames(game.scores).length}}
              </div>
              <div class="col-12 mt-4">
                Fase(s) {{Object.getOwnPropertyNames(game.phases).length}}
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <h3>Ponto(s)</h3>
          <score-create v-bind:g="game"/>
        </div>

        <div class="mt-4">
          <h3>Medalha(s)</h3>
          <medal-search v-bind:g="game"/>
          <div class="row">
            <div class="col-12 col-lg-4 col-xl-4" v-for="medal in game.medals"
                 v-bind:key="medal.id">
              <medal-remove v-bind:g="game" v-bind:m="medal"/>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <h3>Jogadore(s)</h3>
          <player-search v-bind:g="game"/>
          <div class="row">
            <div class="col-12 col-lg-4 col-xl-4" v-for="player in game.players"
                 v-bind:key="player.id">
              <player-remove v-bind:g="game" v-bind:p="player"/>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="col-12 col-xl-4">
      <h2>Fase(s) do jogo</h2>
      <div class="timeline">
        <div class="item" v-for="phase in game.phases" v-bind:key="phase.id">
          <div class="date">{{phase.from}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Show',
    components: {
      Pacman: () => import('../loaders/Pacman'),
      Update: () => import('./Update'),

      // Medals
      MedalSearch: () => import('./medal/Search'),
      MedalRemove: () => import('./medal/Remove'),

      // Player
      PlayerSearch: () => import('./player/Search'),
      PlayerRemove: () => import('./player/Remove'),

      // Score
      ScoreCreate: () => import('./score/Create'),
    },
    data() {
      return {
        waiting: false,
        game: {
          title: '',
          description: '',
          players: {}
        }
      };
    },
    methods: {
      getGame() {
        this.waiting = true;
        this.$auth.$http.get(`game/${this.$route.params.game}`)
          .then(response => {
            this.game = response.data.data;
          })
          .catch(error => {

          })
          .finally(() => {
            this.waiting = false;
          });
      }
    },
    mounted() {
      this.getGame();
    }
  };
</script>

<style lang="scss" scoped>
  @import "~bootstrap/scss/functions";
  @import "../../assets/styles/variables";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";
  @import "~bootstrap/scss/grid";
  @import "~bootstrap/scss/card";
  @import "~bootstrap/scss/buttons";
  @import "~bootstrap/scss/images";
  @import "~bootstrap/scss/utilities/spacing";

  .timeline {
    padding-left: 10px;
    border-left: 2px solid;
  }
</style>
