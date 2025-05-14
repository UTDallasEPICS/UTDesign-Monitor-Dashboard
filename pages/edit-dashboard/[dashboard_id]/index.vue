<template>
    <div class="flex justify-center gap-x-4 mt-4 mb-8">
        <NuxtLink class="custom-button flex items-center justify-center px-12 py-6 text-2xl" :to="`/edit-dashboard/${dashboardCuid}/1`">
            <button>
                Edit
            </button>
        </NuxtLink>
        
        <div class="relative">
            <button class="custom-button flex items-center justify-center px-12 py-6 text-2xl" @click="toggleDropdown">
                Other
            </button>
            
            <div v-if="showDropdown" class="absolute left-1/2 -translate-x-1/2 w-max bg-white border border-gray-300 rounded-lg mt-2 shadow-lg w-full transition">
                <NuxtLink class="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-2xl" :to="`/edit-dashboard/${dashboardCuid}/post`">
                    Post
                </NuxtLink>
                <NuxtLink class="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-2xl" :to="`/dashboard/${dashboardCuid}/1`">
                    Preview
                </NuxtLink>
                <NuxtLink class="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-2xl" :to="`/edit-dashboard/${dashboardCuid}/rename`">
                    Rename
                </NuxtLink>
            </div>
        </div>

        <NuxtLink class="custom-button flex items-center justify-center px-12 py-6 text-2xl" :to="`/dashboardlist`">
            <button>
                Delete
            </button>
        </NuxtLink>
    </div>

    <div class="w-2/3 mx-auto border-4 border-gray-300">
        <div>
            <iframe class="h-[70vh] w-full" :src="previewUrl" allow="fullscreen" frameborder="0"></iframe>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const previewUrl = ref("https://en.wikipedia.org/wiki/Main_Page"); // Set the initial preview URL here
const showDropdown = ref(false); // Toggle for dropdown visibility

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}
const route = useRoute()
const dashboardCuid = route.params.dashboard_id


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

  div > a:hover {
  background-color: rgb(215, 213, 213);
}
</style>