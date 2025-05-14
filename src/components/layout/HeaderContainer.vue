<script setup>
import { RouterLink } from 'vue-router'
import { VIcon } from 'vuetify/components'
</script>

<template>
  <v-app-bar app class="header-container">
    <div class="header">
      <RouterLink to="/" class="header-title">Quik<span>Clip</span></RouterLink>
      <div class="header-links">
        <a href="https://github.com/jettpbaker/quikclip" target="_blank" class="github-link">
          <v-icon icon="mdi-github" size="large" />
        </a>
        <RouterLink to="/about" class="header-link">About</RouterLink>
      </div>
    </div>
  </v-app-bar>
</template>

<style scoped>
.header-container {
  background-color: #121212;
  border-bottom: 1px solid #4e4e4e;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  padding: 1rem;
}

.header-title {
  font-size: 2rem;
  font-weight: bolder;
  font-style: italic;
  color: rgb(255, 255, 255);
  text-decoration: none;
}

.header-title span {
  color: white;
  font-style: normal;
}

.header-link {
  color: white;
  font-size: 1.5rem;
  font-weight: bolder;
}

.header-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.github-link {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.github-link:hover {
  opacity: 0.8;
}
</style>
