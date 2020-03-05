<template>
  <div class="container">
    <h1>Meus jogos</h1>
    <div class="row">
      <div class="col-12">
        <Create/>
      </div>
      <div class="col-12 col-md-6 col-lg-4" v-for="game in games" v-bind:key="game.id">
        <div class="card mb-4 slide-bottom">
          <div class="card-header">
            {{game.title}}
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-md-6 col-lg-6 col-xl-4"
                   title="Quantidade de jogadore(s) neste jogo">
                <span class="gg-boy"></span> <span class="number">{{game.players}}</span>
              </div>
              <div class="col-12 col-md-6 col-lg-6 col-xl-4"
                   title="Quantidade de medalha(s) neste jogo">
                <span class="gg-flag"></span> <span class="number">{{game.medals}}</span>
              </div>
              <div class="col-12 col-md-6 col-lg-6 col-xl-4"
                   title="Quantidade de fase(s) neste jogo">
                <span class="gg-border-style-dashed"></span> <span
                class="number">{{game.phases}}</span>
              </div>
              <div class="col-12 col-md-6 col-lg-6 col-xl-4"
                   title="Quantidade de ponto(s) neste jogo">
                <span class="gg-add"></span> <span class="number">{{game.points}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Pacman -->
    <Pacman v-if="waiting"/>
  </div>
</template>

<script>
  export default {
    name: 'Game',
    components: {
      Pacman: () => import('../../components/loaders/Pacman'),
      Create: () => import('./Create') // Lazy Loading a Component ...
    },
    data() {
      return {
        waiting: false,
        games: []
      };
    },
    methods: {
      getGames() {
        this.waiting = true;
        this.$auth.$http.get('/game')
          .then((response) => {
            this.games = response.data.data;
          })
          .catch((error) => {
            if (error.response) {
              if (error.response.status === 401) {
                console.log('unauthorized, logging out ...');
                window.location.replace('/login');
              }
            }
          })
          .finally(() => {
            this.waiting = false;
          });
      }
    },
    mounted() {
      this.getGames();
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
  @import "~bootstrap/scss/utilities/spacing";

  // Icons
  @import "~css.gg/icons/add.css";
  @import "~css.gg/icons/boy.css";
  @import "~css.gg/icons/border-style-dashed.css";
  @import "~css.gg/icons/flag.css";

  @keyframes slide-bottom {
    0% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  .number {
    font-size: 16px;
  }

  .gg-add,
  .gg-boy,
  .gg-border-style-dashed,
  .gg-flag {
    transform: scale(.6);
    display: inline-block;
  }

  .slide-bottom {
    animation: slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }
</style>
