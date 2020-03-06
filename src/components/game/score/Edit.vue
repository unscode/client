<template>
  <div class="mt-3" v-bind:class="{vibrate: destroying}">
    <button class="btn btn-sm btn-outline-primary mb-1 slide-bottom"
            v-show="!editing"
            @click="toggleEditing"
    >
      Editar
    </button>
    <div class="card slide-bottom" v-show="editing">
      <div class="card-body p-0">
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

          <div class="mt-4" v-show="!deleting">
            <Pacman v-if="updating"/>
            <div v-if="!updating">
              <button class="btn btn-sm btn-outline-secondary"
                      @click.prevent="toggleEditing"
              >
                Cancelar
              </button>
              <button class="btn btn-sm btn-primary ml-md-2 ml-lg-2 ml-xl-2"
                      @click.prevent="updateScore"
              >
                Atualizar
              </button>
              <button class="btn btn-sm btn-outline-danger ml-md-3 ml-lg-3 ml-xl-3"
                      @click.prevent="toggleDeleting"
              >
                Remover
              </button>
            </div>
          </div>

          <div class="mt-4" v-show="deleting">
            <button class="btn btn-sm btn-outline-danger"
                    @click.prevent="destroyScore"
            >
              Sim! quero remover
            </button>
            <button class="btn btn-sm btn-outline-secondary ml-md-3 ml-lg-3 ml-xl-3"
                    @click.prevent="toggleDeleting"
            >
              Cancelar
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ScoreEdit',
    props: {
      g: { // Game
        type: Object,
        required: true
      },
      s: { // Score
        type: Object,
        required: true,
      }
    },
    components: {
      Pacman: () => import('../../loaders/Pacman'),
    },
    data() {
      return {
        editing: false,
        updating: false,
        deleting: false,
        destroying: false,
        disabled: false,
        game: {},
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
      toggleEditing() {
        if (!this.editing) {
          this.errors = {
            title: false,
            value: false
          };
        }
        this.editing = !this.editing;
      },
      toggleDeleting() {
        this.deleting = !this.deleting;
      },
      updateScore() {
        this.disabled = this.updating = true;
        this.$auth.$http.put(`game/${this.g.id}/score/${this.s.id}`, this.score)
          .then(response => {
            this.toggleEditing();
            this.score = {
              title: '',
              value: ''
            };
          })
          .catch(error => {
            const response = error.response;
            if (response.data) {
              if (response.status === 422 && response.data.errors) {
                this.errors = error.response.data.errors;
              }
            }
          })
          .finally(() => {
            this.disabled = this.updating = false;
          });
      },
      destroyScore() {
        this.disabled = this.destroying = true;
        this.$auth.$http.delete(`game/${this.g.id}/score/${this.s.id}`)
          .then(response => {
            this.$delete(this.g.scores, this.s.id);
          })
          .catch(error => {

          })
          .finally(() => {
            this.disabled = this.destroying = false;
          });
      },
    },
    mounted() {
      this.game = this.g;
      this.score = this.s;
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

  /* ----------------------------------------------
 * Generated by Animista on 2020-3-5 7:34:4
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

  /**
   * ----------------------------------------
   * animation vibrate-1
   * ----------------------------------------
   */
  @keyframes vibrate {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(-2px, -2px);
    }
    60% {
      transform: translate(2px, 2px);
    }
    80% {
      transform: translate(2px, -2px);
    }
    100% {
      transform: translate(0);
    }
  }

  .vibrate {
    animation: vibrate 0.3s linear infinite both;
  }
</style>

