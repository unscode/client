<template>
  <div ref="score">
    <div class="card mb-3">
      <div class="card-body pt-2 pb-2">
        <div class="row">
          <div class="col-12 col-md-8 col-lg-8 col-xl-8">{{this.s.title}}</div>
          <div class="col-12 col-md-4 col-lg-4 col-xl-4">{{this.s.value}}</div>
          <div class="col-12">
            <score-edit v-bind:g="g" v-bind:s="s"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ScoreShow',
    props: {
      g: { // Game
        type: Object,
        required: true
      },
      s: { // Score
        type: Object,
        required: true
      }
    },
    components: {
      ScoreEdit: () => import('./Edit')
    },
    mounted() {
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
</style>
