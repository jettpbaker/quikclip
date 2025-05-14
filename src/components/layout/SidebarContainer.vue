<script setup>
import ClipList from '@/components/ui/ClipList.vue'
</script>

<template>
  <v-sheet class="sidebar pa-4">
    <ClipList />
  </v-sheet>
</template>

<style scoped>
.sidebar {
  background-color: #121212;
  border-left: 1px solid #4e4e4e;
  height: calc(100vh - var(--v-app-bar-height, 64px));
  overflow-y: auto;
}
</style>
