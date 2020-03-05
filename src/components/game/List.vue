<template>
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4" v-for="game in games" v-bind:key="game.id">
      <router-link v-bind:to="{name: 'game.item', params: { game: game.id } }">
        <div class="card mb-4 slide-bottom">
          <div class="card-header">
            #{{game.id}} {{game.title}}
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
        <button class="btn btn-outline-primary"
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

  @keyframes slide-bottom {
    0% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  .numbers {
    width: 100%;
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
</style>
