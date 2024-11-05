<script setup lang="ts">
import { ref } from 'vue'

const inputUrl = ref('')
const imageUrl = ref('https://example.com/image.jpg')

function updateImageUrl() {
  imageUrl.value = inputUrl.value
}
</script>

<template lang="pug">
div.mx-auto.mt-20.absolute
  div.mx-auto.gap-2
    button
      NuxtLink(to="/") Home
    button 
      NuxtLink(to="/my-dashboards") my dashboards
    button
      NuxtLink(to="/shared-dashboards") shared dashboards
    button
      NuxtLink(to="/new-dashboard") new dashboard
    button
      NuxtLink(to="/admin") Admin
  
  div.mt-6
    label(for="image-url") Enter Image URL:
    input#image-url(type="text" v-model="inputUrl" placeholder="Enter image URL")
    button(@click="updateImageUrl") Submit
    
  img(:src="imageUrl" alt="User uploaded image" class="w-48 h-48 rounded-md shadow-lg")

NuxtPage
</template>
