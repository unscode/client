<template>
  <div class="mt-3">
    <button class="btn btn-sm btn-outline-secondary mb-1 slide-bottom"
            v-show="!creating"
            @click="toggle"
    >
      PONTO +1
    </button>
    <div class="card slide-bottom" v-show="creating">
      <div class="card-body">
        <form>
          <div class="row">
            <div class="col-12 col-md-8 col-lg-8 col-xl-8">
              <div class="input-group">
                <div class="input-group-text">Título</div>
                <input class="form-control" placeholder="O título do ponto"
                       v-bind:disabled="disabled"
                       v-bind:class="{'is-invalid': errors.title}"
                       v-model="score.title"
                />
                <div class="invalid-feedback mb-4" v-if="errors.title">
                  {{errors.title[0]}}
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4 col-lg-4 col-xl-4">
              <div class="input-group">
                <div class="input-group-text">Valor</div>
                <input class="form-control" placeholder="O valor do ponto"
                       v-bind:disabled="disabled"
                       v-bind:class="{'is-invalid': errors.value}"
                       v-model="score.value"
                />
                <div class="invalid-feedback mb-4" v-if="errors.value">
                  {{errors.value[0]}}
                </div>
              </div>
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
              <button class="btn btn-sm btn-primary ml-3" @click.prevent="storeScore">
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
    name: 'ScoreCreate',
    props: {
      g: { // Game
        type: Object,
        required: true
      },
    },
    components: {
      Pacman: () => import('../../loaders/Pacman'),
    },
    data() {
      return {
        creating: false,
        disabled: false,
        waiting: false,
        score: {
          title: '',
          value: ''
        },
        errors: {
          title: false,
          value: false
        }
      };
    },
    methods: {
      toggle() {
        if (!this.creating) {
          this.errors = {
            title: false,
            value: false
          };
        }
        this.creating = !this.creating;
      },
      storeScore() {
        this.disabled = this.waiting = true;
        this.$auth.$http.post(`game/${this.g.id}/score`, this.score)
          .then((response) => {
            if (response.data) {
              if (response.data.data) {
                const score = response.data.data;
                this.$set(this.g.scores, score.id, score);
              }
            }
            this.toggle();
            this.score = {
              title: '',
              value: ''
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
  @import "../../../assets/styles/variables";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";
  @import "~bootstrap/scss/buttons";
  @import "~bootstrap/scss/card";
  @import "~bootstrap/scss/forms";
  @import "~bootstrap/scss/grid";
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

