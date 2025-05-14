<script setup></script>

<template>
  <v-main>
    <div class="about-page">
      <h1>About</h1>

      <h3>How Does It Work?</h3>
      <p>
        QuikClip uses <a href="https://ffmpegwasm.netlify.app/">ffmpeg.wasm</a> to process video and
        audio directly in your browser.
      </p>

      <h3>Where Are My Clips Stored?</h3>
      <p>
        All clips are stored locally in
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">IndexedDB</a>.
      </p>

      <h3>Expect Bugs</h3>
      <p>
        I made this site in 2 days, so expect bugs. That being said, I've found it fairly reliable!
        <br />
        I don't really expect anyone other than me to use this, but thought I'd throw together a
        janky about page in case anyone does
      </p>
    </div>
  </v-main>
</template>

<style scoped>
.about-page {
  padding: 1rem;
}

h3 {
  margin-top: 1rem;
}

p {
  margin-top: 0.5rem;
}
</style>
