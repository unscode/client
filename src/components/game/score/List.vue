<template>
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4" v-for="score in scores" v-bind:key="score.id">
      <div class="card mb-4 slide-bottom">
        <div class="card-header">
          #{{score.id}} {{score.title}} <br/>
          <h3>{{score.value}}</h3>
        </div>
        <div class="card-body">

        </div>
      </div>
    </div>
    <div class="col-12">
      <!-- Pacman -->
      <Pacman v-if="waiting"/>
      <!-- Load -->
      <div class="mt-5">
        <button class="btn btn-outline-primary"
                v-bind:disabled="waiting"
                v-if="page > 1"
                @click="getscores"
        >
          {{waiting ? 'Carregando...' : 'Carregar +'}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ScoreList',
    props: {
      g: {
        type: Object,
        required: true
      }
    },
    components: {
      Pacman: () => import('../../loaders/Pacman'),
    },
    data() {
      return {
        waiting: false,
        page: 1,
        scores: []
      };
    },
    methods: {
      getscores() {
        this.waiting = true;
        this.$auth.$http.get(`game${this.g.id}/score`, {
          params: { page: this.page }
        })
          .then((response) => {
            let scores = [];

            if (response.data) {
              if (response.data.data) {
                scores = response.data.data;
              }
            }

            for (let prop in scores) {
              if (scores.hasOwnProperty(prop)) {
                this.scores.push(scores[prop]);
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
      this.getscores();
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
  @import "~bootstrap/scss/utilities/spacing";

  @keyframes slide-bottom {
    0% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  .slide-bottom {
    animation: slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }
</style>
