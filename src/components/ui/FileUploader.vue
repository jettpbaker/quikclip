<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['file-selected'])

const fileInput = ref(null)
const file = ref(null)

const handleUserClick = () => {
  fileInput.value.click()
}

const handleFileChange = (event) => {
  file.value = event.target.files[0]
  emitFileSelected()
}

const handleDrop = (event) => {
  file.value = event.dataTransfer.files[0]
  emitFileSelected()
}

const clearFile = () => {
  file.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const emitFileSelected = () => {
  emit('file-selected', file.value)
}

defineExpose({
  clearFile,
})

const fileSizeFormatted = computed(() => {
  if (!file.value) return ''
  const bytes = file.value.size
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
})
</script>

<template>
  <div
    class="file-uploader"
    @dragenter.prevent
    @dragover.prevent
    @dragleave.prevent
    @drop.prevent="handleDrop"
    @click="handleUserClick"
  >
    <template v-if="!file">
      <v-icon icon="mdi-upload" class="file-icon"></v-icon>
      <h3>Drop file here or click to upload</h3>
      <p class="file-size-limit">Max size: 2GB</p>
      <input
        type="file"
        accept="video/*"
        class="file-input"
        ref="fileInput"
        @change="handleFileChange"
      />
    </template>

    <template v-else>
      <div class="file-details-container">
        <div class="file-header">
          <button @click.stop="clearFile" class="clear-button" aria-label="Remove file">
            <v-icon icon="mdi-close"></v-icon>
          </button>
        </div>
        <div class="file-details">
          <v-icon icon="mdi-file-video" class="file-icon"></v-icon>
          <div class="file-meta">
            <span class="file-name" :title="file.name">{{ file.name }}</span>
            <span class="file-size">{{ fileSizeFormatted }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.file-uploader {
  width: 100%;
  height: 14rem;
  border-radius: 0.75rem;
  color: #e2e8f0;
  transition:
    border-color 0.3s ease,
    background-color 0.75s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #141414;
  border: 2px dashed #4e4e4e;
  text-align: center;
  cursor: pointer;
  padding: 1rem;
}

.file-uploader:hover {
  background-color: #171717;
  border-color: #5e5e5e;
}

.file-details-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgb(39, 39, 39);
  border: 2px solid #4e4e4e;
  border-radius: 0.5rem;
}

.file-size-limit {
  font-size: 0.8rem;
  color: #a0aec0;
  margin-top: 0.5rem;
}

.file-header {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: calc(100% - 1rem);
  padding: 0;
  z-index: 1;
}

.file-input {
  display: none;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.file-details {
  display: flex;
  align-items: center;
  gap: 0.1rem;
  overflow: hidden;
  flex-shrink: 1;
  min-width: 0;
  justify-content: center;
}

.file-icon {
  font-size: 3.5rem;
  color: white;
  flex-shrink: 0;
}

.file-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
  min-width: 0;
}

.file-name {
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 16rem;
}

.file-size {
  font-size: 1rem;
  color: #a8a8a8;
}

.clear-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s ease;
}

.clear-button:hover {
  color: #efeff1;
}
</style>
