<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">
      <img class="brand" src="../assets/illustrations/brand2.svg" alt="Brand"/>
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
            aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <router-link class="nav-link" to="/game">Jogo(s)</router-link>
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" to="/medal">Medalha(s)</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">Sobre</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'Navbar'
  };
</script>

<style lang="scss" scoped>
  @import "~bootstrap/scss/functions";
  @import "../assets/styles/variables";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";
  @import "~bootstrap/scss/navbar";

  .navbar {
    top: 0;
    left: 0;
    width: 100%;
    padding: {
      top: 20px;
      bottom: 20px;
    };
    background: black;
    position: fixed;
    z-index: 999;

    .brand {
      width: 70px;
    }
  }
</style>
