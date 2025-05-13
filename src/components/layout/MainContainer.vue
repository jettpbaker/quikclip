<script setup>
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { toBlobURL } from '@ffmpeg/util'
import { ref, onMounted } from 'vue'

const loaded = ref(false)
const ffmpeg = new FFmpeg()

const message = ref(null)

const loadFFMPEG = async () => {
  console.log('Trying to load FFMPEG')
  message.value = 'Loading FFMPEG core...' // Give user feedback

  ffmpeg.on('log', ({ ffmpegMessage }) => {
    message.value = ffmpegMessage
    console.log(ffmpegMessage)
  })

  // Add progress handler for more insight
  ffmpeg.on('progress', ({ progress, time }) => {
    console.log(`FFMPEG Progress: ${progress * 100}% (time: ${time / 1000000}s)`)
    // You could update a progress bar here
  })

  try {
    console.log('Starting ffmpeg.load()...')

    const corePath = '/ffmpeg/ffmpeg-core.js'
    const wasmPath = '/ffmpeg/ffmpeg-core.wasm'
    const workerPath = '/ffmpeg/ffmpeg-core.worker.js'

    await ffmpeg.load({
      coreURL: await toBlobURL(corePath, 'text/javascript'),
      wasmURL: await toBlobURL(wasmPath, 'application/wasm'),
      workerURL: await toBlobURL(workerPath, 'text/javascript'),
    })
    console.log('ffmpeg.load() finished successfully.')
    loaded.value = true
    message.value = 'FFMPEG Loaded Successfully!'
  } catch (error) {
    console.error('Error loading FFMPEG:', error)
    message.value = `Error loading FFMPEG: ${error.message}`
    loaded.value = false
  }
}

onMounted(() => {
  loadFFMPEG()
})
</script>

<template>
  <v-col cols="12" sm="8" class="pa-5 order-1" style="min-height: 50vh">
    <h1>Main</h1>
    <p>FFMPEG Loaded: {{ loaded }}</p>
    <p>Message: {{ message }}</p>
  </v-col>
</template>
