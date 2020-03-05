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
            <input class="form-control" placeholder="O título do jogo"/>
          </div>
          <div class="mt-3">
            <button class="btn btn-outline-danger mb-1"
                    @click.prevent="toggle"
            >
              Cancelar
            </button>
            <button class="btn btn-primary ml-3">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Create',
    data() {
      return {
        creating: false
      };
    },
    methods: {
      toggle() {
        this.creating = !this.creating;
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
