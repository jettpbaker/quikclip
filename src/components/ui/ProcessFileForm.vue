<script setup>
import { ref } from 'vue'
import FileUploader from './FileUploader.vue'
import ffmpeg from '@/services/ffmpeg'

const activeTab = ref(0)
const startTime = ref('')
const endTime = ref('')
const file = ref(null)
const videoSrc = ref(null)

const checkTimeFormats = (startTime, endTime) => {
  if (/^\d{2}:\d{2}$/.test(startTime) && /^\d{2}:\d{2}$/.test(endTime)) {
    return true
  }
  snackbar.value = true
  text.value = 'Time must be in MM:SS format'
  return false
}

const run = async () => {
  checkTimeFormats(startTime.value, endTime.value)

  if (!file.value) {
    snackbar.value = true
    text.value = 'Please select a file'
    return
  }

  let data
  if (activeTab.value === 0) {
    data = await ffmpeg.cutVideo(file.value, startTime.value, endTime.value)
  } else {
    data = await ffmpeg.compressVideo(file.value, startTime.value, endTime.value)
  }

  const src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
  videoSrc.value = src
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

    <v-tabs v-model="activeTab" fixed-tabs bg-color="#121212" class="w-100 mt-4">
      <v-tab>Cut</v-tab>
      <v-tab>Cut &amp; Compress</v-tab>
    </v-tabs>

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
  <video controls :src="videoSrc" style="width: 20rem; height: auto" />
</template>
