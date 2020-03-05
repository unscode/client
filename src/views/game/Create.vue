<template>
  <div class="mt-5 mb-5">
    <button class="btn btn-outline-secondary mb-1 slide-bottom"
            v-show="!creating"
            @click="toggle"
    >
      JOGO +1
    </button>
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
              <button class="btn btn-outline-danger mb-1"
                      @click.prevent="toggle"
              >
                Cancelar
              </button>
              <button class="btn btn-primary ml-3" @click.prevent="storeGame">
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
      Pacman: () => import('../../components/loaders/Pacman'),
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
</style>
