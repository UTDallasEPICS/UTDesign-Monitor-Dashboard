<script setup lang="ts">
const previewUrl = ref("https://en.wikipedia.org/wiki/Main_Page"); // Set the initial preview URL here
const showDropdown = ref(false); // Toggle for dropdown visibility

// Function to toggle the dropdown visibility
function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

const route = useRoute()
const fullURL = route.fullPath
const regex = /^.*\/([a-zA-Z0-9]+)\/([a-zA-Z0-9]+)$/ 
const match = fullURL.match(regex)
const dashboardCuid = match ? match[2] : null // It grabs EditDashboard for the second index of match, so we want the third index or index #2


</script>

<template lang="pug">
  div.bg-white.border-4.border-gray-300.rounded-xl.w-full.max-w-2xl.p-16.shadow-2xl
    div.slide-button-container.flex.justify-center.items-center.mb-10
      iframe(:src="previewUrl" class="w-full h-full rounded-lg" allow="fullscreen" frameborder="0")
    div.buttons.flex.justify-between.mt-8
        NuxtLink(:to="`/edit-dashboard/${dashboardCuid}`")
          button.bg-purple-200.px-12.py-4.rounded-lg.text-xl.font-semibold.w-full.text-center.mr-4 Edit
        NuxtLink(:to="`/dashboard/${dashboardCuid}/0`")
          button.bg-green-200.px-12.py-4.rounded-lg.text-xl.font-semibold.w-full.text-center Present
</template>
