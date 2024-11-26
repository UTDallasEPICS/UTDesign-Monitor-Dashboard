<script setup lang="ts">
import { ref } from 'vue'
const previewUrl = ref("https://en.wikipedia.org/wiki/Main_Page"); // Set the initial preview URL here
const showDropdown = ref(false); // Toggle for dropdown visibility

// Function to toggle the dropdown visibility
function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

const inputImageUrl = ref('')
const imageUrl = ref('https://example.com/image.jpg') // Default image URL

const inputVideoUrl = ref('')
const videoUrl = ref('https://example.com/sample-video.mp4') // Default video URL

const inputWebsiteUrl = ref('')
const websiteUrl = ref('https://www.example.com') // Default website URL

function updateImageUrl() {
  imageUrl.value = inputImageUrl.value
}

function updateVideoUrl() {
  videoUrl.value = inputVideoUrl.value
}

function updateWebsiteUrl() {
  websiteUrl.value = inputWebsiteUrl.value
}
</script>

<template lang="pug">
MDBody
  MDHeader
  div.bg-purple-200.min-h-screen.w-screen.flex.justify-center.items-center
      div.bg-white.border-4.border-gray-300.rounded-xl.w-full.max-w-2xl.p-16.shadow-2xl
          // Slide button (large and centered, now showing link preview)
          div.slide-button-container.flex.justify-center.items-center.mb-10
              iframe(:src="previewUrl" class="w-full h-full rounded-lg" allow="fullscreen" frameborder="0")

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
