<script setup>
import { onMounted } from 'vue'
import ffmpeg from '@/services/ffmpeg'

onMounted(() => {
  ffmpeg.load()
})
</script>

<template>
  <v-col cols="12" sm="8" class="pa-5 order-1" style="min-height: 50vh">
    <h1>Main</h1>
    <p>FFMPEG Loading: {{ ffmpeg.isLoading }}</p>
    <p>FFMPEG Ready: {{ ffmpeg.isReady }}</p>
    <p>Status: {{ ffmpeg.message }}</p>
  </v-col>
</template>
