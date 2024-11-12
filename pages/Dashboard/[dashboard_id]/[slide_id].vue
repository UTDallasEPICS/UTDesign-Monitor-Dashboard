<script setup lang="ts">
import { ref } from 'vue'

const inputImageUrl = ref('') 
const imageUrl = ref('https://example.com/image.jpg')  //  image URL

const inputVideoUrl = ref('') 
const videoLink = ref('https://example.com/sample-video.mp4')  //  video URL

function updateImageUrl() {
  imageUrl.value = inputImageUrl.value
}

function updateVideoLink() {
  videoLink.value = inputVideoUrl.value
}
</script>

<template>
  <div>
    <div>
      <label for="image-url">Enter Image URL:</label>
      <input id="image-url" type="text" v-model="inputImageUrl" placeholder="Enter image URL" />
      <button @click="updateImageUrl">Submit</button>

      <div style="margin-top: 20px;">
        <h2>Image Preview</h2>
        <img :src="imageUrl" alt="User uploaded image" style="width: 200px; height: auto;" />
      </div>
    </div>

    <div style="margin-top: 20px;">
      <label for="video-url">Enter Video URL:</label>
      <input id="video-url" type="text" v-model="inputVideoUrl" placeholder="Enter video URL" />
      <button @click="updateVideoLink">Submit</button>
    </div>

    <div class="relative flex items-center justify-center h-screen overflow-hidden">
      <video :key="videoLink" autoplay loop muted class="absolute z-10 w-auto min-w-full min-h-full max-w-none">
        <source :src="videoLink" type="video/mp4"/>
      </video>
    </div>
  </div>
</template>

<style>
body {
  background-color: white;
}
</style>
