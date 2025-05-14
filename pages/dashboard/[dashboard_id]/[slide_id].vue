<script setup lang="ts">
import { ref } from 'vue'

const inputImageUrl = ref('')
const imageUrl = ref('https://example.com/image.jpg') // Default image URL

const inputVideoUrl = ref('')
const videoLink = ref('https://example.com/sample-video.mp4') // Default video URL

const inputWebsiteUrl = ref('')
const websiteUrl = ref('https://www.example.com') // Default website URL

function updateImageUrl() {
  imageUrl.value = inputImageUrl.value
}

function updateVideoLink() {
  videoLink.value = inputVideoUrl.value
}

function updateWebsiteUrl() {
  websiteUrl.value = inputWebsiteUrl.value
}
</script>

<template lang="pug">
div
  div
    label(for="image-url") Enter Image URL:
    input#image-url(type="text" v-model="inputImageUrl" placeholder="Enter image URL")
    button(@click="updateImageUrl") Submit

    div(style="margin-top: 20px;")
      h2 Image Preview
      img(:src="imageUrl" alt="User uploaded image" style="width: 200px; height: auto;")

  div(style="margin-top: 20px;")
    label(for="video-url") Enter Video URL:
    input#video-url(type="text" v-model="inputVideoUrl" placeholder="Enter video URL")
    button(@click="updateVideoLink") Submit

    div.relative.flex.items-center.justify-center.h-screen.overflow-hidden
      video.absolute.z-10.w-auto.min-w-full.min-h-full.max-w-none(autoplay loop muted controls :key="videoLink")
        source(:src="videoLink" type="video/mp4")
        | Your browser does not support the video tag.

  div(style="margin-top: 20px;")
    label(for="website-url") Enter Website URL:
    input#website-url(type="text" v-model="inputWebsiteUrl" placeholder="Enter website URL")
    button(@click="updateWebsiteUrl") Submit

    div(style="margin-top: 20px;")
      h2 Website Preview
      iframe(
        v-if="websiteUrl" 
        :src="websiteUrl" 
        style="width: 100%; height: 500px; border: 1px solid #ccc;"
      )
        | Your browser does not support iframes.
</template>

<style>
body {
  background-color: white;
}
</style>