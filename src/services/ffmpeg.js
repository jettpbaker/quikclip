import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import { ref } from 'vue'

const instance = new FFmpeg()
const progress = ref(0)

instance.on('log', (message) => {
  console.log(message.message)
})

instance.on('progress', (ratio) => {
  if (ratio.progress > 1) {
    progress.value = 0
  } else {
    progress.value = Math.floor(ratio.progress * 100)
  }
})

const isLoading = ref(false)
const isReady = ref(false)

const prepareFile = async (file) => {
  if (!file) {
    alert('Please select a file first')
    return
  }
  const inputName = file.name
  // const fileExtension = file.name.split('.')[0]
  const outputName = `${crypto.randomUUID()}.mp4`

  const uint8 = await fetchFile(file)
  await instance.writeFile(inputName, uint8)

  return { inputName, outputName }
}

const ffmpeg = {
  isLoading: isLoading.value,
  isReady: isReady.value,
  instance,
  progress,

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

  async cutVideo(file, startTime, endTime) {
    const { inputName, outputName } = await prepareFile(file)
    const args = [
      '-analyzeduration',
      '20M',
      '-probesize',
      '10M',
      '-ss',
      startTime,
      '-to',
      endTime,
      '-i',
      inputName,
      '-c:v',
      'copy',
      '-c:a',
      'aac',
      '-b:a',
      '128k',
      outputName,
    ]

    await instance.exec(args)
    const data = await instance.readFile(outputName)

    instance.deleteFile(inputName)
    instance.deleteFile(outputName)

    return data
  },
}

export default ffmpeg
