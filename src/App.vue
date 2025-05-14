<script setup>
import HeaderContainer from './components/layout/HeaderContainer.vue'
import ContentContainer from './components/layout/ContentContainer.vue'
</script>

<template>
  <v-app class="app">
    <HeaderContainer />
    <ContentContainer />
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
