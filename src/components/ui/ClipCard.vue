<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
import { db } from '@/db/db'

const props = defineProps({
  clip: Object,
})

const videoRef = ref(null)
let player = null
let url = ref(null)

const deleteClip = () => {
  db.clips.delete(props.clip.id)
}

onMounted(() => {
  player = new Plyr(videoRef.value, {
    controls: ['play', 'fullscreen'],
  })
  player.volume = 0.5

  url.value = URL.createObjectURL(props.clip.video)
})

onBeforeUnmount(() => {
  if (player) {
    player.destroy()
  }
  if (url.value) {
    URL.revokeObjectURL(url.value)
  }
})
</script>

<template>
  <div class="clip-card">
    <div class="clip-card-header">
      <a class="clip-card-button" :href="url" download>
        <v-icon class="clip-card-icon">mdi-download</v-icon>
      </a>
      <button class="clip-card-button" @click="deleteClip">
        <v-icon class="clip-card-icon">mdi-delete</v-icon>
      </button>
    </div>
    <video ref="videoRef" :src="url" playsinline width="100%" />
  </div>
</template>

<style scoped>
@import 'plyr/dist/plyr.css';

.clip-card {
  width: 100%;
  background-color: transparent;
  border-radius: 0.25rem;
  overflow: hidden;
  position: relative;
  margin-bottom: 3rem;
}

.clip-card-header {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  z-index: 10;
}

.clip-card-button {
  background-color: transparent;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
}

.clip-card-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(0.25rem);
}

.clip-card-icon {
  color: white;
  font-size: 1.75rem;
}

:deep(.plyr) {
  --plyr-color-main: rgba(255, 255, 255, 0.3);
}
</style>
