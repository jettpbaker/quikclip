<script setup>
import HeaderContainer from './components/layout/HeaderContainer.vue'
</script>

<template>
  <v-app class="app">
    <HeaderContainer />
    <router-view />
  </v-app>
</template>

<style>
html,
body,
#app,
.app {
  height: 100%;
  margin: 0;
}
.app {
  overflow-y: hidden;
}
</style>
