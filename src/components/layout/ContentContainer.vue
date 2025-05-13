<script setup>
import MainContainer from './MainContainer.vue'
import SidebarContainer from './SidebarContainer.vue'
</script>

<template>
  <v-main>
    <v-container fluid class="pa-0 fill-height">
      <v-row no-gutters class="fill-height">
        <MainContainer />
        <SidebarContainer />
      </v-row>
    </v-container>
  </v-main>
</template>
