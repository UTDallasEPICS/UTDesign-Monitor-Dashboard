<!-- index.vue -->
<script setup lang="ts">

import { ref } from 'vue'

const inputImageUrl = ref('')
const imageUrl = ref('https://example.com/image.jpg')  // image URL

const inputVideoUrl = ref('')
const videoUrl = ref('https://example.com/sample-video.mp4')  // video URL

function updateImageUrl() {
  imageUrl.value = inputImageUrl.value
}

function updateVideoUrl() {
  videoUrl.value = inputVideoUrl.value
}
</script>

<template lang="pug">
div(class="flex flex-col space-y-4")
  MDHeader
  div(style="margin-top: 20px;")
    label(for="image-url") Enter Image URL:
    input#image-url(type="text" v-model="inputImageUrl" placeholder="Enter image URL")
    button(@click="updateImageUrl") Submit

    div(style="margin-top: 20px;")
      h2 Image Preview
      img(:src="imageUrl" alt="User uploaded image" style="width: 200px; height: auto;")

  div(style="margin-top: 20px;")
    label(for="video-url") Enter Video URL:
    input#video-url(type="text" v-model="inputVideoUrl" placeholder="Enter video URL")
    button(@click="updateVideoUrl") Submit

    div(style="margin-top: 20px;")
      h2 Video Preview
      video(v-if="videoUrl" autoplay loop muted controls style="width: 400px; height: auto;")
        source(:src="videoUrl" type="video/mp4")
        | Your browser does not support the video tag.
</template>
