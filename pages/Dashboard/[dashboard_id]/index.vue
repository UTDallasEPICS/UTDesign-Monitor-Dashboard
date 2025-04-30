<template>
  <div class="flex justify-center gap-x-4 mt-8 mb-4">
    <NuxtLink class="custom-button flex items-center justify-center px-12 py-6 text-2xl" :to="`/EditDashboard/${dashboardCuid}`">
      <button>
        Edit
      </button>
    </NuxtLink>
    <NuxtLink class="custom-button flex items-center justify-center px-12 py-6 text-2xl" :to="`/Dashboard/${dashboardCuid}/0`">
      <button>
        Present
      </button>
    </NuxtLink>
  </div>
  <div class="w-2/3 mx-auto border-4 border-gray-300">
    <div>
      <iframe :src="previewUrl" class="h-[70vh] w-full" allow="fullscreen" frameborder="0"></iframe>
    </div>
  </div>
</template>

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

<style>
    .custom-button {
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: #447a58;
    color: white;
    border-radius: 5px;
    padding: 5px;
  }

  .custom-button:hover {
    background-color: #a5d5a7;
    color: black;
  }
</style>