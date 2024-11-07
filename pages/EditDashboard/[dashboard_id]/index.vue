<script setup lang="ts">
import { ref } from 'vue';

const previewUrl = ref("https://en.wikipedia.org/wiki/Main_Page"); // Set the initial preview URL here
</script>

<template lang="pug">
div.bg-purple-200.min-h-screen.w-screen.flex.justify-center.items-center
    div.bg-white.border-4.border-gray-300.rounded-xl.w-full.max-w-2xl.p-16.shadow-2xl
        // Slide button (large and centered, now showing link preview)
        div.slide-button-container.flex.justify-center.items-center.mb-10
            iframe(:src="previewUrl" class="w-full h-full rounded-lg" allow="fullscreen" frameborder="0")
        
        // Other buttons below
        div.buttons.flex.justify-between.mt-8
            button.bg-purple-200.px-8.py-4.rounded-lg.text-xl.font-semibold.w-full.text-center.mr-4 Post
            NuxtLink(to="/EditDashboard/0/0").bg-gray-200.px-8.py-4.rounded-lg.text-xl.font-semibold.w-full.text-center.mr-4 Edit
            button.bg-red-200.px-8.py-4.rounded-lg.text-xl.font-semibold.w-full.text-center Extra
</template>

<style scoped>
/* Larger slide button container */
.slide-button-container {
    height: 240px; /* Adjust as needed for a larger iframe preview */
    width: 100%;
}

/* iframe styling */
iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
}

/* Button styling for smoother hover effect */
button {
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #e2e8f0; /* Lighter shade on hover */
}
</style>
