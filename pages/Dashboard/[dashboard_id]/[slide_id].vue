<script setup lang="ts">
import { ref } from 'vue'

const inputImageUrl = ref('') 
const imageUrl = ref('https://example.com/image.jpg')  // Default image URL

const inputVideoUrl = ref('') 
const videoLink = ref('https://www.youtube.com/embed/wpYwBQAOq58')  

function updateImageUrl() {
  imageUrl.value = inputImageUrl.value
}

function updateVideoUrl() {
  const videoIdMatch = inputVideoUrl.value.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/)
  if (videoIdMatch) {
    videoLink.value = `https://www.youtube.com/embed/${videoIdMatch[1]}`
  } else {
    alert("Please enter a valid YouTube URL")
  }
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
      <label for="video-url">Enter YouTube Video URL:</label>
      <input id="video-url" type="text" v-model="inputVideoUrl" placeholder="Enter YouTube video URL" />
      <button @click="updateVideoUrl">Submit</button>

      <div style="margin-top: 20px;">
        <h2>Video Preview</h2>
        <iframe :src="videoLink" width="800" height="450" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>
