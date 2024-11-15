<script setup lang="ts">
import { ref } from 'vue';

const previewUrl = ref("https://en.wikipedia.org/wiki/Main_Page"); // Set the initial preview URL here
const showDropdown = ref(false); // Toggle for dropdown visibility

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}
</script>

<template lang="pug">
div.bg-purple-200.min-h-screen.w-screen.flex(class="flex flex-col space-y-4")
    MDHeader
    div.bg-white.border-4.border-gray-300.rounded-xl.w-full.max-w-2xl.p-16.shadow-2xl.justify-center.items-center
        // Slide button (large and centered, now showing link preview)
        div.slide-button-container.flex.justify-center.items-center.mb-10
            iframe(:src="previewUrl" class="w-full h-full rounded-lg" allow="fullscreen" frameborder="0")
        
        // Other buttons below
        div.buttons.flex.justify-between.mt-8
            NuxtLink(to="/EditDashboard/0/1" class="bg-purple-200 px-4 py-4 rounded-lg text-xl font-semibold w-full text-center mr-4") Edit Slides
            div.relative.mr-4
                button(@click="toggleDropdown" class="bg-gray-200 px-8 py-4 rounded-lg text-xl font-semibold w-full text-center") Other
                // Dropdown Menu
                div(v-if="showDropdown" class="absolute bg-white border border-gray-300 rounded-lg mt-2 shadow-lg w-full")
                    NuxtLink(to="/EditDashboard/0/1" class="block px-4 py-2 text-gray-700 hover:bg-gray-100") Post to Display
                    NuxtLink(to="/EditDashboard/0/2" class="block px-4 py-2 text-gray-700 hover:bg-gray-100") Show Preview
                    NuxtLink(to="/EditDashboard/0/3" class="block px-4 py-2 text-gray-700 hover:bg-gray-100") Option 3
            button.bg-red-200.px-8.py-4.rounded-lg.text-xl.font-semibold.w-full.text-center Delete
</template>

<style scoped>
.slide-button-container {
    height: 240px; 
    width: 100%;
}

iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
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

.mr-4 {
    margin-right: 1rem; 
}
</style>
