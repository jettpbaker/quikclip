<script setup>
import { ref } from 'vue'
import FileUploader from './FileUploader.vue'
import ffmpeg from '@/services/ffmpeg'
import { db } from '@/db/db'
const startTime = ref('')
const endTime = ref('')
const file = ref(null)

const checkTimeFormats = (startTime, endTime) => {
  if (!/^\d{2}:\d{2}$/.test(startTime) && !/^\d{2}:\d{2}$/.test(endTime)) {
    snackbar.value = true
    text.value = 'Time must be in MM:SS format'
    return false
  }

  const startTimeParts = startTime.split(':')
  const endTimeParts = endTime.split(':')

  const startTimeMinutes = parseInt(startTimeParts[0])
  const startTimeSeconds = parseInt(startTimeParts[1])

  const endTimeMinutes = parseInt(endTimeParts[0])
  const endTimeSeconds = parseInt(endTimeParts[1])

  const startTimeTotalSeconds = startTimeMinutes * 60 + startTimeSeconds
  const endTimeTotalSeconds = endTimeMinutes * 60 + endTimeSeconds

  if (startTimeTotalSeconds >= endTimeTotalSeconds) {
    snackbar.value = true
    text.value = 'Start time must be before end time'
    return false
  }

  return true
}

const run = async () => {
  if (!checkTimeFormats(startTime.value, endTime.value)) {
    return
  }

  if (!file.value) {
    snackbar.value = true
    text.value = 'Please select a file'
    return
  }

  const data = await ffmpeg.cutVideo(file.value, startTime.value, endTime.value)

  console.log('Trying to add clip to db')
  await db.clips.add({
    createdAt: new Date(),
    video: new Blob([data.buffer], { type: 'video/mp4' }),
  })
}

const handleFileSelected = (selectedFile) => {
  file.value = selectedFile
}

const snackbar = ref(false)
const text = ref('')
const timeout = ref(3000)
</script>

<template>
  <v-snackbar v-model="snackbar" :timeout="timeout">
    {{ text }}
  </v-snackbar>

  <v-col cols="12" md="10" lg="8" class="my-4 pa-0">
    <FileUploader @file-selected="handleFileSelected" />

    <div class="cut-title">CUT</div>

    <v-row class="my-0 mx-0">
      <v-col cols="6" class="pa-0 pt-4 pr-1">
        <v-text-field
          v-model="startTime"
          label="Start Time (MM:SS)"
          placeholder="00:00"
          variant="outlined"
          density="compact"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="6" class="pa-0 pt-4 pl-1">
        <v-text-field
          v-model="endTime"
          label="End Time (MM:SS)"
          placeholder="00:00"
          variant="outlined"
          density="compact"
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>

    <v-btn
      @click="run"
      color="white"
      class="w-100 mt-4 text-black font-weight-bold"
      size="large"
      variant="flat"
    >
      RUN
    </v-btn>
  </v-col>
</template>

<style scoped>
.cut-title {
  width: 100%;
  text-align: center;
  border-bottom: 3px solid #e0e0e0;
  padding: 1rem 0 0.25rem 0;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
