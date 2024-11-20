<script setup lang="ts">
import { ref } from 'vue';

const inputImageUrl = ref('');
const imageUrl = ref('https://example.com/image.jpg');

const inputVideoUrl = ref('');
const videoLink = ref('https://example.com/sample-video.mp4');

function updateImageUrl() {
  imageUrl.value = inputImageUrl.value;
}

function updateVideoLink() {
  videoLink.value = inputVideoUrl.value;
}
</script>

<template lang="pug">
MDBody
  MDHeader
  div.bg-white.border-4.border-gray-300.rounded-xl.w-full.max-w-2xl.p-16.shadow-2xl.items-center.flex.flex-col.space-y-4
    div.mb-8
      label.block.text-lg.font-semibold.mb-2(for="image-url") Enter Image URL:
      input#image-url.w-full.px-4.py-2.border.border-gray-300.rounded-lg(type="text" v-model="inputImageUrl" placeholder="Enter image URL")
      button.mt-4.bg-purple-200.px-4.py-2.rounded-lg.text-base.font-semibold(@click="updateImageUrl") Submit

      div(style="margin-top: 20px;")
        img.w-48.h-auto.rounded-lg.border.border-gray-300(:src="imageUrl" alt="")

    div.mt-8
      label.block.text-lg.font-semibold.mb-2(for="video-url") Enter Video URL:
      input#video-url.w-full.px-4.py-2.border.border-gray-300.rounded-lg(type="text" v-model="inputVideoUrl" placeholder="Enter video URL")
      button.mt-4.bg-purple-200.px-4.py-2.rounded-lg.text-base.font-semibold(@click="updateVideoLink") Submit

    div.relative.flex.items-center.justify-center.h-64.overflow-hidden.mt-8
      video.absolute.z-10.w-auto.min-w-full.min-h-full.max-w-none(autoplay loop muted :key="videoLink")
        source(:src="videoLink" type="video/mp4")
</template>

<style scoped>
.bg-purple-200 {
  background-color: #e9d5ff;
}

.bg-white {
  background-color: #ffffff;
}

.min-h-screen {
  min-height: 100vh;
}

.w-full {
  width: 100%;
}

.border-gray-300 {
  border-color: #d1d5db;
}

.rounded-xl {
  border-radius: 1rem;
}

.shadow-2xl {
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
}

input {
  transition: border-color 0.2s ease;
}

input:focus {
  border-color: #a78bfa;
  outline: none;
}

button {
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #e2e8f0;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
  z-index: 10;
}

.w-48 {
  width: 12rem;
}

.h-64 {
  height: 16rem;
}

body {
  overflow-x: hidden;
}
</style>
