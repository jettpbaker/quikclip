# QuikClip

[QuikClip](https://quikclip.pages.dev/) is a web application that allows you to quickly clip sections from video in your browser.

## Overview

This project is an incredibly minimalist MVP built with Vue 3, Vite, and Vuetify. It leverages `ffmpeg.wasm` to perform video and audio processing tasks client-side. Processed clips are also stored locally in your browser's IndexedDB, so the whole app runs completely in the client.

The primary goal of this application was for me to start experimenting with Vuetify and gain more Vue experience. That being said, I do see myself using it on occasion which is cool.

Expect some bugs, some weird code, I threw this together fairly quickly.

## Key Technologies

- **Vite:** For the fast development server and build process.
- **Vue 3:** For the reactive UI.
- **Vuetify:** For UI components.
- **Vue-Router:** For routing
- **FFmpeg.wasm:** For in-browser video/audio processing.
- **Dexie.js:** For interacting with IndexedDB.

## Project Setup

To get started with development:

```sh
pnpm install
```

### Run Dev Server

```sh
pnpm dev
```
