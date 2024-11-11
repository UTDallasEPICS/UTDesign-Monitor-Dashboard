<!-- index.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const inputUrl = ref('') 
const imageUrl = ref('https://example.com/image.jpg') 

function updateImageUrl() {
  imageUrl.value = inputUrl.value
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

    <div>
      <label for="image-url">Enter Image URL:</label>
      <input id="image-url" type="text" v-model="inputUrl" placeholder="Enter image URL" />
      <button @click="updateImageUrl">Submit</button>

      <div>
        <h2>Image Preview</h2>
        <img :src="imageUrl" alt="User uploaded image" />
      </div>
    </div>
  </div>
</template>
