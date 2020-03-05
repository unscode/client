<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    props: {
      msg: String,
    },
    computed: {},
    mounted() {
      console.log('Mounted');
    }
  };
</script>

<style scoped>
  h1 {
    color: white;
  }
</style>
