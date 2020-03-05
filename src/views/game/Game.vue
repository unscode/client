<template>
  <div class="">
    <div class="container">
      <h1>Meus jogos</h1>
      <i class="gg-spinner" v-if="waiting"></i>

      <div class="row">
        <div class="col-12">
          <Create/>
        </div>
        <div class="col-12 col-md-4 col-lg-4" v-for="game in games" v-bind:key="game.id">
          <div class="card mb-4">
            <div class="card-header">
              {{game.title}}
            </div>
            <div class="card-body">
              <div class="row">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Game',
    components: {
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

  .gg-spinner {
    transform: scale(var(--ggs, 2))
  }

  .gg-spinner,
  .gg-spinner::after,
  .gg-spinner::before {
    box-sizing: border-box;
    position: relative;
    display: block;
    width: 20px;
    height: 20px
  }

  .gg-spinner::after,
  .gg-spinner::before {
    content: "";
    position: absolute;
    border-radius: 100px
  }

  .gg-spinner::before {
    animation: spinner 1s cubic-bezier(.6, 0, .4, 1) infinite;
    border: 3px solid transparent;
    border-top-color: currentColor
  }

  .gg-spinner::after {
    border: 3px solid;
    opacity: .2
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(359deg)
    }
  }
</style>
