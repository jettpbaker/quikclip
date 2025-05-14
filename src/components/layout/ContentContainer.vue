<script setup>
import MainContainer from './MainContainer.vue'
import SidebarContainer from './SidebarContainer.vue'
</script>

<template>
  <v-main>
    <v-container fluid class="pa-0 fill-height">
      <v-row no-gutters class="fill-height">
        <v-col cols="12" md="8">
          <MainContainer />
        </v-col>
        <v-col cols="12" md="4">
          <SidebarContainer />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
