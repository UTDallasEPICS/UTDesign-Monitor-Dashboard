<!-- index.vue -->
<script setup lang="ts">
import { ref } from 'vue'
const previewUrl = ref("https://en.wikipedia.org/wiki/Main_Page"); // Set the initial preview URL here
const showDropdown = ref(false); // Toggle for dropdown visibility

// Function to toggle the dropdown visibility
function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

const imageUrl = ref('https://example.com/image.jpg')  // image URL


const videoUrl = ref('https://example.com/sample-video.mp4')  // video URL

</script>

<template lang="pug">
MDBody
  MDHeader
  div.bg-white.border-4.border-gray-300.rounded-xl.w-full.max-w-2xl.p-16.shadow-2xl
    div.slide-button-container.flex.justify-center.items-center.mb-10
      iframe(:src="previewUrl" class="w-full h-full rounded-lg" allow="fullscreen" frameborder="0")

          // Other buttons below
    div.buttons.flex.justify-between.mt-8
        button.bg-purple-200.px-8.py-4.rounded-lg.text-xl.font-semibold.w-full.text-center.mr-4 
            NuxtLink(to="/EditDashboard/0") Edit
        button.bg-red-200.px-8.py-4.rounded-lg.text-xl.font-semibold.w-full.text-center 
            NuxtLink(to="/Dashboard/0/0") View
</template>
