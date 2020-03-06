<template>
  <div>
    <div class="card" v-show="!creating">
      <div class="card-body">
        <button class="btn btn-lg btn-outline-primary slide-bottom"
                @click="toggle"
        >
          JOGO +1
        </button>
      </div>
    </div>
    <div class="card slide-bottom" v-show="creating">
      <div class="card-body">
        <form>
          <div class="input-group">
            <div class="input-group-text">Título</div>
            <input class="form-control" placeholder="O título do jogo"
                   v-bind:disabled="disabled"
                   v-bind:class="{'is-invalid': errors.title}"
                   v-model="game.title"
            />
            <div class="invalid-feedback mb-4" v-if="errors.title">
              {{errors.title[0]}}
            </div>
          </div>
          <div class="input-group">
            <div class="input-group-text">Descrição</div>
            <input class="form-control" placeholder="A descrição do jogo"
                   v-bind:disabled="disabled"
                   v-bind:class="{'is-invalid': errors.description}"
                   v-model="game.description"
            />
            <div class="invalid-feedback mb-4" v-if="errors.description">
              {{errors.description[0]}}
            </div>
          </div>
          <div class="mt-4">
            <Pacman v-if="waiting"/>
            <div v-if="!waiting">
              <button class="btn btn-sm btn-outline-danger mb-1"
                      @click.prevent="toggle"
              >
                Cancelar
              </button>
              <button class="btn btn-sm btn-primary ml-3" @click.prevent="storeGame">
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Create',
    components: {
      Pacman: () => import('../loaders/Pacman'),
    },
    data() {
      return {
        creating: false,
        disabled: false,
        waiting: false,
        game: {
          title: '',
          description: ''
        },
        errors: {
          title: false,
          description: false
        }
      };
    },
    methods: {
      toggle() {
        if (!this.creating) {
          this.errors = {
            title: false,
            description: false
          };
        }
        this.creating = !this.creating;
      },
      storeGame() {
        this.disabled = this.waiting = true;
        this.$auth.$http.post('game', this.game)
          .then((response) => {
            this.game = {
              title: '',
              description: ''
            };
          })
          .catch((error) => {
            const response = error.response;
            if (response.data) {
              if (response.status === 422 && response.data.errors) {
                this.errors = error.response.data.errors;
              }
            }
          })
          .finally(() => {
            this.disabled = this.waiting = false;
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~bootstrap/scss/functions";
  @import "../../assets/styles/variables";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";
  @import "~bootstrap/scss/buttons";
  @import "~bootstrap/scss/card";
  @import "~bootstrap/scss/forms";
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

  .card {
    background-color: #000000;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0' gradientTransform='rotate(96,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%230FF'/%3E%3Cstop offset='1' stop-color='%23CF6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(84,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23F00'/%3E%3Cstop offset='1' stop-color='%23FC0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='7.919999999999999'%3E%3Cpath transform='translate(-103.25 6.800000000000001) rotate(-0.25 1409 581) scale(0.95277)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='2.64' transform='translate(-122 77) rotate(8.1 800 450) scale(1.00864)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(21.299999999999997 -96) rotate(66 401 736) scale(1.00864)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='2.4'%3E%3Cpath transform='translate(462 -0.8000000000000007) rotate(0.20000000000000018 150 345) scale(0.98159)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='5.28' transform='translate(-143 -207.5) rotate(61.19999999999999 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='translate(-294 82) rotate(10.2 1400 132) scale(0.85)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
  }
</style>
