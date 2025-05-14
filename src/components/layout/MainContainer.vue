<script setup>
import { ref, markRaw, onMounted } from 'vue'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'

const loaded = ref(false)
const file = ref(null)
const startTime = ref('')
const endTime = ref('')
const ffmpegRef = ref(markRaw(new FFmpeg({ log: true })))
const videoRef = ref(null)
const messageRef = ref(null)
const fastCut = ref(false)

const loadFFmpeg = async () => {
  const ffmpeg = ffmpegRef.value
  ffmpeg.on('log', ({ message }) => {
    console.log(message)
    messageRef.value.innerText = message
  })
  await ffmpeg.load()
  loaded.value = true
}

const transcodeVideo = async () => {
  if (!file.value) {
    alert('Please select a file first')
    return
  }
  if (!startTime.value || !endTime.value) {
    alert('Please enter both start and end times')
    return
  }
  const ffmpeg = ffmpegRef.value
  const inputName = file.value.name
  const baseName = inputName.replace(/\.[^/.]+$/, '')
  const outputName = `${baseName}_${startTime.value.replace(/:/g, '-')}_${endTime.value.replace(/:/g, '-')}.mp4`

  // Write the user-selected file into FFmpeg FS
  await ffmpeg.writeFile(inputName, await fetchFile(file.value))
  // Build arguments for fastCut vs full re-encode
  let args = []
  if (fastCut.value) {
    // Copy streams (no re-encode) for fastest trim
    args = [
      '-ss',
      startTime.value,
      '-to',
      endTime.value,
      '-i',
      inputName,
      '-c:v',
      'copy', // stream-copy video
      '-c:a',
      'aac', // re-encode audio to AAC
      '-b:a',
      '128k', // audio bitrate
      outputName,
    ]
  } else {
    // Full encode with multithreading (faster preset, container-level seek)
    args = [
      '-ss',
      startTime.value,
      '-i',
      inputName,
      '-to',
      endTime.value,
      '-c:v',
      'libx264',
      '-preset',
      'ultrafast',
      '-loglevel',
      'info',
      outputName,
    ]
  }
  await ffmpeg.exec(args)
  const data = await ffmpeg.readFile(outputName)

  ffmpeg.deleteFile(inputName)
  ffmpeg.deleteFile(outputName)

  if (videoRef.value) {
    videoRef.value.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
  }
}

onMounted(() => {
  console.log('crossOriginIsolated:', window.crossOriginIsolated)
  console.log('SharedArrayBuffer supported:', typeof SharedArrayBuffer !== 'undefined')
})
</script>

<template>
  <div>
    <button v-if="!loaded" @click="loadFFmpeg">Load ffmpeg-core</button>
    <div v-else>
      <input type="file" accept="video/*" @change="(e) => (file = e.target.files[0])" />
      <label style="display: block; margin: 8px 0">
        <input type="checkbox" v-model="fastCut" />
        Fast cut (no re-encode, stream copy)
      </label>
      <input type="text" placeholder="Start time (hh:mm:ss)" v-model="startTime" />
      <input type="text" placeholder="End time (hh:mm:ss)" v-model="endTime" />
      <button @click="transcodeVideo" :disabled="!file || !startTime || !endTime">
        Transcode to mp4
      </button>
      <video ref="videoRef" controls></video>
      <p ref="messageRef"></p>
    </div>
  </div>
</template>

<style scoped>
/* Add any component-specific styles here */
</style>

<!-- Local: 00:13:57 -->
<!-- Remote: 00:43:00 -->
