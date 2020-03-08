<template>
  <div>
    <navbar/>
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-8 col-xl-8">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <img class="school_bag" src="../assets/svg/education/028-school-bag.svg"/>
                  Aluno(s)
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-lg-6 col-xl-6 mt-4">
              <div class="card">
                <div class="card-body">
                  <img class="alphabet" src="../assets/svg/education/001-alphabet.svg"/>
                  Jogo(s)
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6 col-xl-6 mt-4">
              <div class="card">
                <div class="card-body">
                  <img class="alphabet" src="../assets/svg/education/011-diploma.svg"/>
                  Medalha(s)
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4 col-xl-4 mt-4 mt-md-4 mt-lg-0 mt-xl-0">
          <div class="card">
            <div class="card-body">
              <img class="lightbulb" src="../assets/svg/education/019-lightbulb.svg"/>
              <h1 class="mt-5">Gamitication</h1>
              <h5>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus fuga ipsam
                laboriosam tempora. Assumenda deserunt doloremque ducimus ea, ex expedita facilis
                fuga fugiat id iste, magni, minima placeat repudiandae ullam?
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'All',
    components: {
      Navbar: () => import('../components/Navbar'), // Lazy Loading a Component ...
    }
  };
</script>

<style lang="scss" scoped>
  @import "~bootstrap/scss/functions";
  @import "../assets/styles/variables";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";
  @import "~bootstrap/scss/grid";
  @import "~bootstrap/scss/card";
  @import "~bootstrap/scss/utilities/spacing";

  .card {
    min-height: 100%;
    background: black;
  }

  .school_bag {
    width: 50%;
  }

  .alphabet {
    width: 50%;
  }

  .lightbulb {
    width: 100%;
  }
</style>
