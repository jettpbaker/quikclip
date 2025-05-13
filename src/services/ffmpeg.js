import { FFmpeg } from '@ffmpeg/ffmpeg'
import { ref } from 'vue'
import { toBlobURL } from '@ffmpeg/util'

const instance = new FFmpeg()
const isReady = ref(false)
const isLoading = ref(false)
const message = ref(null)
let loadPromise = null

instance.on('log', ({ ffmpegMessage }) => {
  console.log('[FFMPEG Log]:', ffmpegMessage)
  message.value = ffmpegMessage
})

const ffmpeg = {
  isReady,
  isLoading,
  message,
  load: async () => {
    if (isReady.value) {
      return
    }
    if (isLoading.value && loadPromise) {
      return loadPromise
    }

    isLoading.value = true
    isReady.value = false
    message.value = 'Loading FFMPEG core'

    loadPromise = (async () => {
      try {
        const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core-mt@0.12.9/dist/esm'
        const corePath = `${baseURL}/ffmpeg-core.js`
        const wasmPath = `${baseURL}/ffmpeg-core.wasm`
        const workerPath = `${baseURL}/ffmpeg-core.worker.js`

        await instance.load({
          coreURL: await toBlobURL(corePath, 'text/javascript'),
          wasmURL: await toBlobURL(wasmPath, 'application/wasm'),
          workerURL: await toBlobURL(workerPath, 'text/javascript'),
        })

        isReady.value = true
        message.value = 'FFMPEG core loaded'
      } catch (err) {
        console.error(err)
        isReady.value = false
        message.value = 'Error loading FFMPEG core'
      } finally {
        isLoading.value = false
      }
    })()
    return loadPromise
  },
}

export default ffmpeg
