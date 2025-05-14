import { FFmpeg } from '@ffmpeg/ffmpeg'
import { ref } from 'vue'

const instance = new FFmpeg()

const isLoading = ref(false)
const isReady = ref(false)

const ffmpeg = {
  isLoading: isLoading.value,
  isReady: isReady.value,
  instance,

  async load() {
    isLoading.value = true
    try {
      await instance.load()
      isReady.value = true
    } catch (error) {
      console.error('Failed to load ffmpeg', error)
    } finally {
      isLoading.value = false
    }
  },
}

export default ffmpeg
