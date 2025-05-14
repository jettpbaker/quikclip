<!-- 
 
<script setup>
import { useLiveQuery } from './useLiveQuery';
import { db } from './db'; // your Dexie instance

const { data: todos, error } = useLiveQuery(() => db.todos.toArray());
</script>

<template>
  <div v-if="error">Error: {{ error.message }}</div>
  <ul v-else>
    <li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li>
  </ul>
</template>


-->

<script setup>
import { useLiveQuery } from '@/db/useLiveQuery'
import { db } from '@/db/db'

// Cache object URLs for clip videos
const urlMap = new Map()

const { data: clips, error } = useLiveQuery(() => db.clips.orderBy('createdAt').reverse().toArray())

const getClipUrl = (clip) => {
  if (!urlMap.has(clip.id)) {
    urlMap.set(clip.id, URL.createObjectURL(clip.video))
  }
  return urlMap.get(clip.id)
}

const formatDate = (date) => {
  const d = new Date(date)
  return d.toLocaleString()
}

const deleteClip = async (id) => {
  await db.clips.delete(id)
}

const deleteAllClips = async () => {
  await db.clips.clear()
}

const downloadClip = (clip) => {
  const url = getClipUrl(clip)
  const a = document.createElement('a')
  a.href = url
  a.download = `clip_${new Date(clip.createdAt).toISOString()}.mp4`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
</script>

<template>
  <div v-if="error">
    <v-alert type="error" class="mb-4">{{ error.message }}</v-alert>
  </div>
  <div v-else>
    <div class="d-flex align-center justify-space-between mb-4">
      <h3 class="text-h6">Your Clips</h3>
      <v-btn color="error" variant="text" @click="deleteAllClips">
        <v-icon left>mdi-delete</v-icon>Delete All
      </v-btn>
    </div>
    <v-list two-line>
      <v-list-item v-for="clip in clips" :key="clip.id" class="mb-4">
        <v-list-item-content>
          <video :src="getClipUrl(clip)" controls width="250" class="mb-2" />
          <v-list-item-subtitle>{{ formatDate(clip.createdAt) }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click="downloadClip(clip)" title="Download Clip">
            <v-icon>mdi-download</v-icon>
          </v-btn>
          <v-btn icon color="error" @click="deleteClip(clip.id)" title="Delete Clip">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-list-item v-if="!clips || clips.length === 0">
        <v-list-item-content>
          <v-list-item-title>No clips yet.</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>
