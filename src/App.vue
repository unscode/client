<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>

      <br/>
      <button @click="authenticate('oauth2')">Auth with GiC</button>
    </div>
    <router-view/>
  </div>
</template>

<style>

</style>

<script>
  export default {
    methods: {
      authenticate: function (provider) {
        this.$auth.authenticate(provider)
          .then(() => {
            console.log(this.$auth.isAuthenticated());
          });
      }
    }
  };
</script>
