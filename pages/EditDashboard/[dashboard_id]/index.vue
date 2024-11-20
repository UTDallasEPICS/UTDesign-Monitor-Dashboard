<script setup lang="ts">
import { ref } from 'vue';

const previewUrl = ref("https://en.wikipedia.org/wiki/Main_Page"); // Set the initial preview URL here
const showDropdown = ref(false); // Toggle for dropdown visibility

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}


</script>

<template lang="pug">
MDBody
    MDHeader
    div.bg-white.border-4.border-gray-300.rounded-xl.w-full.max-w-2xl.p-16.shadow-2xl.justify-center.flex.flex-col.space-y-4
        // Slide button (large and centered, now showing link preview)
        div.slide-button-container.flex.justify-center.items-center.mb-10
            iframe.w-full.h-full.rounded-lg(:src="previewUrl" allow="fullscreen" frameborder="0")
        
        // Other buttons below
        div.buttons.flex.justify-between.mt-8
            button.bg-purple-200.px-8.py-4.rounded-lg.text-xl.font-semibold.w-full.text-center.mr-4 
                NuxtLink(to="/EditDashboard/0/0") Edit
            div.relative.mr-4
                button.bg-gray-200.px-8.py-4.rounded-lg.text-xl.font-semibold.w-full.text-center(@click="toggleDropdown") Other
                // Dropdown Menu
                div.absolute.bg-white.border.border-gray-300.rounded-lg.mt-2.shadow-lg.w-full(v-if="showDropdown")
                    NuxtLink.block.px-4.py-2.text-gray-700.hover_bg-gray-100(to="/EditDashboard/0/1") Post to Display
                    NuxtLink.block.px-4.py-2.text.gray-700.hover_bg-gray-100(to="/EditDashboard/0/2") Show Preview
                    NuxtLink.block.px-4.py-2.text-gray-700.hover_bg-gray-100(to="/EditDashboard/0/rename") Name Dashboard
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
