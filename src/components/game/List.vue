<template>
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4 mb-5">
      <create/>
    </div>
    <div class="col-12 col-md-6 col-lg-4 mb-5" v-for="game in games" v-bind:key="game.id">
      <router-link v-bind:to="{name: 'game.item', params: { game: game.id } }">
        <div class="card mb-4 slide-bottom">
          <div class="card-header">
            <h4 class="title">{{game.title}}</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-md-6 col-lg-6 col-xl-4 mb-2"
                   title="Quantidade de jogadore(s) neste jogo">
                <div class="numbers">
                  <span class="gg-boy"></span>
                  <span class="number">{{game.players}}</span>
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-6 col-xl-4 mb-2"
                   title="Quantidade de medalha(s) neste jogo">
                <div class="numbers">
                  <span class="gg-flag"></span>
                  <span class="number">{{game.medals}}</span>
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-6 col-xl-4 mb-2"
                   title="Quantidade de fase(s) neste jogo">
                <div class="numbers">
                  <span class="gg-border-style-dashed"></span>
                  <span class="number">{{game.phases}}</span>
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-6 col-xl-4 mb-2"
                   title="Quantidade de ponto(s) neste jogo">
                <div class="numbers">
                  <span class="gg-add"></span>
                  <span class="number">{{game.points}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <div class="col-12">
      <!-- Pacman -->
      <Pacman v-if="waiting"/>
      <!-- Load -->
      <div class="mt-5">
        <button class="btn btn-lg btn-outline-primary"
                v-bind:disabled="waiting"
                v-if="page > 1"
                @click="getGames"
        >
          {{waiting ? 'Carregando...' : 'Carregar +'}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Game',
    components: {
      Pacman: () => import('../loaders/Pacman'),
      Create: () => import('./Create'),
    },
    data() {
      return {
        waiting: false,
        page: 1,
        games: []
      };
    },
    methods: {
      getGames() {
        this.waiting = true;
        this.$auth.$http.get('/game', {
          params: { page: this.page }
        })
          .then((response) => {
            let games = [];

            if (response.data) {
              if (response.data.data) {
                games = response.data.data;
              }
            }

            for (let prop in games) {
              if (games.hasOwnProperty(prop)) {
                this.games.push(games[prop]);
              }
            }

            this.page++;
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
  @import "~bootstrap/scss/buttons";
  @import "~bootstrap/scss/utilities/spacing";
  // Icons
  @import "~css.gg/icons/add.css";
  @import "~css.gg/icons/boy.css";
  @import "~css.gg/icons/border-style-dashed.css";
  @import "~css.gg/icons/flag.css";
  // Animations
  @keyframes slide-bottom {
    0% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  .title {
    background: black;
  }

  .numbers {
    width: 100%;
    background: black;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .number {
      margin-left: 5px;
    }

    .gg-add,
    .gg-boy,
    .gg-border-style-dashed,
    .gg-flag {
      display: inline-block;
    }
  }

  .slide-bottom {
    animation: slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }

  .card {
    height: 100%;
    background-color: #000000;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0' gradientTransform='rotate(96,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%230FF'/%3E%3Cstop offset='1' stop-color='%23CF6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(84,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23F00'/%3E%3Cstop offset='1' stop-color='%23FC0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='7.919999999999999'%3E%3Cpath transform='translate(-103.25 6.800000000000001) rotate(-0.25 1409 581) scale(0.95277)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='2.64' transform='translate(-122 77) rotate(8.1 800 450) scale(1.00864)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(21.299999999999997 -96) rotate(66 401 736) scale(1.00864)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='2.4'%3E%3Cpath transform='translate(462 -0.8000000000000007) rotate(0.20000000000000018 150 345) scale(0.98159)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='5.28' transform='translate(-143 -207.5) rotate(61.19999999999999 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='translate(-294 82) rotate(10.2 1400 132) scale(0.85)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
  }
</style>
