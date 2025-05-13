import { FFmpeg } from '@ffmpeg/ffmpeg' // If it's a named export
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import { ref } from 'vue'

// ... (refs and loadPromise remain the same) ...

let instance = null

const ffmpeg = createFFmpeg({
  // For latest version, corePath is usually not needed as it's resolved automatically.
  // If you were using an older version like 0.11.0, you might need:
  // corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
  log: true,
})

const message = ref('Click Start to Transcode')
const isReady = ref(false)
const isLoading = ref(false) // To track loading state

const loadFFmpeg = async () => {
  if (ffmpeg.isLoaded()) {
    console.log('FFmpeg is already loaded.')
    isReady.value = true
    message.value = 'FFmpeg is already loaded and ready!'
    return
  }
  if (isLoading.value) {
    console.log('FFmpeg is currently loading.')
    return
  }
  isLoading.value = true
  isReady.value = false
  message.value = 'Loading FFmpeg-core...'
  console.log('Loading FFmpeg-core...')
  try {
    await ffmpeg.load()
    isReady.value = true
    message.value = 'FFmpeg is loaded and ready!'
    console.log('FFmpeg is loaded and ready!')
  } catch (error) {
    console.error('Failed to load FFmpeg:', error)
    message.value = `Failed to load FFmpeg: ${error.message}`
    isReady.value = false
  } finally {
    isLoading.value = false
  }
}

// Example function to transcode a video file
const transcodeExample = async (inputFile /* File object or URL */) => {
  if (!isReady.value) {
    message.value = 'FFmpeg not loaded. Please load it first.'
    console.error('FFmpeg not loaded. Attempting to load...')
    await loadFFmpeg() // Attempt to load if not loaded
    if (!isReady.value) {
      // Check again after attempting to load
      message.value = 'FFmpeg failed to load. Cannot transcode.'
      console.error('FFmpeg failed to load. Cannot transcode.')
      return null // Indicate failure
    }
  }

  message.value = 'Transcoding in progress...'
  console.log('Starting transcoding example...')
  const inputFileName = inputFile.name || 'input.video' // Use file name or a default
  const outputFileName = 'output.mp4'

  try {
    // Write the file to FFmpeg's virtual file system
    ffmpeg.FS('writeFile', inputFileName, await fetchFile(inputFile))
    message.value = `Input file '${inputFileName}' written. Running FFmpeg command...`
    console.log(`Input file '${inputFileName}' written. Running FFmpeg command...`)

    // Basic command: transcode to mp4. -y overwrites output file if it exists.
    await ffmpeg.run('-i', inputFileName, '-y', outputFileName)

    message.value = 'Transcoding finished. Reading output file...'
    console.log('Transcoding finished. Reading output file...')
    const data = ffmpeg.FS('readFile', outputFileName)

    message.value = 'Transcoding successful!'
    console.log(`Transcoding successful! Output '$outputFileName' size: ${data.byteLength} bytes.`)

    // Create a URL to download or display the video
    const videoUrl = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
    console.log('Output video URL:', videoUrl)

    // Cleanup files from FFmpeg's virtual file system
    ffmpeg.FS('unlink', inputFileName)
    ffmpeg.FS('unlink', outputFileName)
    console.log('Cleaned up input and output files from FFmpeg FS.')

    return videoUrl // Return the URL of the transcoded video
  } catch (error) {
    console.error('Error during transcoding:', error)
    message.value = `Error during transcoding: ${error.message}`
    // Attempt to cleanup files even if an error occurs
    try {
      if (ffmpeg.FS('readdir', '.').includes(inputFileName)) {
        ffmpeg.FS('unlink', inputFileName)
      }
      if (ffmpeg.FS('readdir', '.').includes(outputFileName)) {
        ffmpeg.FS('unlink', outputFileName)
      }
    } catch (cleanupError) {
      console.warn('Could not cleanup files from FFmpeg FS after error:', cleanupError)
    }
    return null // Indicate failure
  }
}

export default {
  isReady, // Reactive ref: true if FFmpeg is loaded and ready
  isLoading, // Reactive ref: true if FFmpeg is currently loading
  message, // Reactive ref: status messages for UI
  load: loadFFmpeg, // Function to load FFmpeg
  transcode: transcodeExample, // Example function to transcode a video
  // You generally don't need to export the ffmpeg instance itself
  // ffmpegInstance: ffmpeg,
}
