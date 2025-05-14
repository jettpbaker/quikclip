<script setup>
import { useLiveQuery } from '@/db/useLiveQuery'
import { db } from '@/db/db'
import ClipCard from '@/components/ui/ClipCard.vue'

const { data: clips } = useLiveQuery(() => db.clips.orderBy('createdAt').reverse().toArray())

const deleteAllClips = () => {
  db.clips.clear()
}
</script>

<template>
  <div class="header">
    <h1 class="title">Your Clips</h1>
    <button class="delete-all-button" @click="deleteAllClips">
      <v-icon>mdi-delete-alert</v-icon>
    </button>
  </div>
  <ClipCard v-for="clip in clips" :key="clip.id" :clip="clip" />
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 3rem;

  width: 100%;
  border-bottom: 3px solid #ffffff;

  font-size: 2rem;
}

.title {
  font-size: 2.5rem;
  font-weight: 600;
}

.delete-all-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.25s ease;
}

.delete-all-button:hover {
  color: #ff9797;
}
</style>
