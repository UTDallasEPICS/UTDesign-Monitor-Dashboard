<!-- index.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const inputImageUrl = ref('')
const imageUrl = ref('https://example.com/image.jpg')  //  image URL

const inputVideoUrl = ref('')
const videoUrl = ref('https://example.com/sample-video.mp4')  //  video URL

function updateImageUrl() {
  imageUrl.value = inputImageUrl.value
}

function updateVideoUrl() {
  videoUrl.value = inputVideoUrl.value
}
</script>

<template>
  <div>
    <div>
      <button><NuxtLink to="/">Home</NuxtLink></button>
      <button><NuxtLink to="/my-dashboards">My Dashboards</NuxtLink></button>
      <button><NuxtLink to="/shared-dashboards">Shared Dashboards</NuxtLink></button>
      <button><NuxtLink to="/new-dashboard">New Dashboard</NuxtLink></button>
      <button><NuxtLink to="/admin">Admin</NuxtLink></button>
    </div>

    <div style="margin-top: 20px;">
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
      <button @click="updateVideoUrl">Submit</button>

      <div style="margin-top: 20px;">
        <h2>Video Preview</h2>
        <video v-if="videoUrl" autoplay loop muted controls style="width: 400px; height: auto;">
          <source :src="videoUrl" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>
</template>
