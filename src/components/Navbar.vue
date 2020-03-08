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
    <span class="navbar-text">
      <span class="name">
        <i class="icon gg-boy"
           v-bind:class="{'bounce-top': waiting}"
        >
        </i>
        <b class="racking-in-expand" v-if="name">{{name}}</b>
        <b class="logout" @click="logout">
          <i class="gg-arrow-right-o"></i>
        </b>
      </span>
    </span>
  </nav>
</template>

<script>
  export default {
    name: 'Navbar',
    data() {
      return {
        waiting: false,
        name: false,
      };
    },
    methods: {
      getProfile() {
        this.waiting = true;
        this.$auth.$http.get('/profile')
          .then((response) => {
            if (response.data) {
              if (response.data.data) {
                this.name = response.data.data.name;
              }
            }
          })
          .catch((error) => {
          })
          .finally(() => {
            this.waiting = false;
          });
      },
      logout() {
        if (this.$auth.isAuthenticated()) {
          this.$auth.logout();
        }
        this.$store.commit('reset');
        window.location.replace('/login');
      }
    },
    mounted() {
      this.getProfile();
    }
  };
</script>

<style lang="scss" scoped>
  @import "../assets/styles/animations";
  @import "~bootstrap/scss/functions";
  @import "../assets/styles/variables";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";
  @import "~bootstrap/scss/navbar";
  @import "~css.gg/icons/boy.css";
  @import "~css.gg/icons/arrow-right-o.css";

  .navbar {
    top: 0;
    left: 0;
    width: 100%;
    padding: {
      top: 20px;
      bottom: 20px;
    };
    background: black;
    border-bottom-right-radius: 25px;
    position: fixed;
    z-index: 999;

    &:before {
      left: 0;
      content: "";
      position: absolute;
      background-color: transparent;
      bottom: -50px;
      height: 50px;
      width: 25px;
      border-top-left-radius: 25px;
      box-shadow: 0 -25px 0 0 black;
    }

    .brand {
      width: 70px;
    }

    .nav-link {
      font-weight: 900;
    }

    .name {
      margin-right: 20px;
      font-weight: 900;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      color: white;

      .icon {
        margin-right: 10px;
        display: inline-block;
      }
    }

    .logout {
      color: red;
      margin-left: 10px;
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
</style>
