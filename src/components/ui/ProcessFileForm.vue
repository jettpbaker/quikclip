<script setup>
import { ref } from 'vue'
import FileUploader from './FileUploader.vue'

const activeTab = ref(0)
const startTime = ref('')
const endTime = ref('')

const checkTimeFormats = (startTime, endTime) => {
  if (/^\d{2}:\d{2}$/.test(startTime) && /^\d{2}:\d{2}$/.test(endTime)) {
    return true
  }
  snackbar.value = true
  text.value = 'Time must be in MM:SS format'
  return false
}

const run = () => {
  // handle run logic
  console.log({
    startTime: startTime.value,
    endTime: endTime.value,
    compress: activeTab.value === 1,
  })

  checkTimeFormats(startTime.value, endTime.value)
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
    <FileUploader />

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
</template>
