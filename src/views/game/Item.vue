<template>
  <div>
    <Show/>
  </div>
</template>

<script>
  export default {
    name: 'Item',
    components: {
      Show: () => import('../../components/game/Show'), // Lazy Loading a Component ...
    }
  };
</script>

<style scoped>

</style>
