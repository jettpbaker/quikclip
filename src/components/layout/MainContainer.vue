<script setup>
import { ref, onMounted } from 'vue'
import ProcessFileForm from '@/components/ui/ProcessFileForm.vue'

import ffmpeg from '@/services/ffmpeg'

const loaded = ref(false)

onMounted(async () => {
  await ffmpeg.load()
  loaded.value = true
})
</script>

<template>
  <v-container fluid class="fill-height align-center justify-center container">
    <ProcessFileForm />
  </v-container>
</template>

<style scoped>
.container {
  max-width: 60rem;
}
</style>
