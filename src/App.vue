<script setup lang="ts">

</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  display: block;
  background-color: #f7f7f7;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
