<template>
  <div class="mb-3">
    <button class="btn btn-sm btn-outline-primary"
            @click="toggle"
            v-show="!searching"
    >
      Procurar por jogador
    </button>
    <div class="card p-3" v-show="searching">
      <div class="card-header p-0">
        <form>
          <div class="input-group">
            <input class="form-control"
                   placeholder="Digite o nome do jogador"
                   v-model="player">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary"
                      @click.prevent="search"
              >
                Procurar
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="card-body p-0 pt-2">
        <Pacman v-if="waiting"/>
        <div v-for="player in players" v-bind:key="player.id">
          <player-add v-bind:g="g" v-bind:m="player"></player-add>
        </div>
        <button class="btn btn-sm btn-outline-danger mt-2"
                @click="toggle"
                v-show="searching"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PlayerSearch',
    props: {
      g: { // Game
        type: Object,
        required: true
      },
    },
    components: {
      Pacman: () => import('../../loaders/Pacman'),
      PlayerAdd: () => import('./Add')
    },
    data() {
      return {
        searching: false,
        disabled: false,
        waiting: false,
        player: '',
        players: []
      };
    },
    methods: {
      toggle() {
        this.searching = !this.searching;
      },
      search() {
        this.waiting = true;
        this.$auth.$http.get(`user/player/search/${this.player}`)
          .then(response => {
            if (response.data) {
              if (response.data.data) {
                this.players = response.data.data;
              }
            }
          })
          .finally(() => {
            this.waiting = false;
          });
      }
    },
    mounted() {
      this.game = this.g;
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
  @import "~bootstrap/scss/forms";
  @import "~bootstrap/scss/input-group";
  @import "~bootstrap/scss/buttons";
  @import "~bootstrap/scss/utilities/spacing";
</style>
