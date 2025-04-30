<template>
  <div class="flex items-center justify-center">
    <div class="bg-white border-4 border-gray-300 rounded-xl w-full max-w-2xl p-16 shadow-2xl items-center flex flex-col space-y-4">
      <div class="flex justify-between items-center gap-10">
        <NuxtLink class="custom-button" v-if="slideIndex > 1" :to="`/EditDashboard/${dashboardCuid}/${parseInt(slideIndex, 10) - 1}`">
          <button class="flex items-center justify-between">
            <Icon icon="ooui:next-rtl" class="mr-2" />
            Previous
          </button>
        </NuxtLink>
        <NuxtLink class="custom-button" v-if="slideIndex <= 1" :to="`/EditDashboard/${dashboardCuid}`">
          <button>
            Back
          </button>
        </NuxtLink>
        <div class="mb-8">
          <label for="select-option" class="block text-lg font-semibold mb-2">Select Type:</label>
          <select id="select-option" v-model="selectedOption" @change="updateSlideType" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
            <option value="">-- Select --</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="website">Website</option>
          </select>
        </div>
        <NuxtLink class="custom-button" v-if="slideIndex == lastIndex" :to="`/EditDashboard/${dashboardCuid}/${parseInt(slideIndex) + 1}`">
          <button @click="createSlide" class="flex items-center justify-center">
            <Icon icon="mingcute:add-fill" class="mr-2 text-xl" />
            New Slide
          </button>
        </NuxtLink>
        <NuxtLink class="custom-button" v-if="slideIndex != lastIndex" :to="`/EditDashboard/${dashboardCuid}/${parseInt(slideIndex) + 1}`">
          <button class="flex items-center justify-center">
            <Icon icon="ooui:next-ltr" class="mr-2" />
            Next
          </button>
        </NuxtLink>
      </div>

      <div class="mb-8">
        <div v-if="selectedOption === 'image'">
          <label for="image-url" class="block text-lg font-semibold mb-2">Enter Image URL:</label>
          <input id="image-url" type="text" v-model="inputImageUrl" placeholder="Enter image URL" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300" />
          <button @click="updateImageUrl" class="custom-button mt-4 bg-purple-200 px-4 py-2 rounded-lg text-base font-semibold hover:bg-purple-300 transition">
            Submit
          </button>
          <div class="mt-5">
            <img :src="imageUrl" alt="" class="w-48 h-auto rounded-lg border border-gray-300" />
          </div>
        </div>

        <div v-if="selectedOption === 'video'">
          <label for="video-url" class="block text-lg font-semibold mb-2">Enter Video URL:</label>
          <input id="video-url" type="text" v-model="inputVideoUrl" placeholder="Enter video or YouTube URL" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300" />
          <button @click="updateVideoLink" class="custom-button mt-4 bg-purple-200 px-4 py-2 rounded-lg text-base font-semibold hover:bg-purple-300 transition">
            Submit
          </button>
          <div class="relative flex items-center justify-center h-64 overflow-hidden mt-8">
            <iframe v-if="isYouTube" :src="videoLink" class="w-full h-full border border-gray-300 rounded-lg" allowfullscreen></iframe>
            <video v-else autoplay loop muted controls class="absolute z-10 w-auto h-auto" :key="videoLink">
              <source :src="videoLink" type="video/mp4" />
            </video>
          </div>
        </div>

        <div v-if="selectedOption === 'website'" class="relative" @mouseenter="showDisclaimer = true" @mouseleave="showDisclaimer = false">
          <div class="relative flex items-center mb-2">
            <span v-if="showDisclaimer" class="absolute -top-6 left-0 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-lg text-gray-800 text-xs whitespace-nowrap">
              Note: Websites with ".com" may not work properly.
            </span>
          </div>
          <label for="website-url" class="block text-lg font-semibold mb-2">Enter Website URL:</label>
          <input id="website-url" type="text" v-model="inputWebsiteUrl" placeholder="Enter website URL" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300" />
          <button @click="updateWebsiteUrl" class="custom-button mt-4 bg-purple-200 px-4 py-2 rounded-lg text-base font-semibold hover:bg-purple-300 transition">
            Submit
          </button>
          <div class="mt-5 h-72">
            <iframe v-if="websiteUrl" :src="websiteUrl" class="w-full h-full border border-gray-300 rounded-lg" allowfullscreen></iframe>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <label for="slide-duration" class="block text-lg font-semibold mb-2">Enter Slide Duration:</label>
        <input id="slide-duration" type="text" v-model="inputDuration" placeholder="Enter in seconds" class="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        <button @click="updateDuration" class="custom-button mt-4 bg-purple-200 px-4 py-2 rounded-lg text-base font-semibold hover:bg-purple-300 transition">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Slide } from '@/types.d.ts'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const selectedOption = ref('');



// Image state
const inputImageUrl = ref('');
const imageUrl = ref('https://example.com/image.jpg');

// Video state
const inputVideoUrl = ref('');
const videoLink = ref('https://example.com/sample-video.mp4');

const isYouTube = ref(false);
const route = useRoute()

const fullURL = route.fullPath

const regex = /^.*\/([a-zA-Z0-9]+)\/(\d+)$/ 
const match = fullURL.match(regex)
const dashboardCuid = match ? match[1] : null
const slideIndex = match ? match[2] : null // need to convert this to an Int so Prisma doesn't complain


const { data: slideData } = await useFetch<Slide>('/api/Slide/slide', { // this is where the data is fetched for the slide on the page
    method: 'GET',
    query: { 
      dashboardCuid : dashboardCuid, 
      index: slideIndex
    }
})

// list of all slides in this dashboard, needed for size so we can know if the current slide index is the last one. 
const { data: slides } = await useFetch<Slide>('/api/Slide/slides', { // linter complaining here, ignore it
  method: 'GET',
  query: {
    dashboardCuid: dashboardCuid
  }
})

const lastIndex = slides.value.length // recall that indexes for slides start from 1, not 0

const inputDuration = ref('');
const duration = ref(slideData.value?.duration) || 10



async function updateDuration() {
   duration.value = inputDuration.value
   const saveSuccess  = await $fetch('/api/Slide/slide', { 
         method: 'PUT', // RESTful APIs are generally for CRUD operations, which are basic database operations
         body: ({ slideData: slideData.value, duration: duration.value})
     })
  return saveSuccess
}

async function createSlide() {
  const saveSuccess = await $fetch('/api/Slide/slide', {
    method: 'POST',
    body: ({ dashboardCuid: dashboardCuid })
  })
}


const inputWebsiteUrl = ref('');
const websiteUrl = ref('https://example.com');

  const showDisclaimer = ref(false);

function updateImageUrl() {
  imageUrl.value = inputImageUrl.value;
}

// Update video URL
function updateVideoLink() {
  const youtubeMatch = inputVideoUrl.value.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w\-]{11})/
  );

  if (youtubeMatch) {
    videoLink.value = `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    isYouTube.value = true;
  } else {
    videoLink.value = inputVideoUrl.value;
    isYouTube.value = false;
  }
}

// Update website URL
function updateWebsiteUrl() {
  websiteUrl.value = inputWebsiteUrl.value;
}

async function updateSlideType() {
    const saveSuccess  = await $fetch('/api/Slide/slide', { 
         method: 'PUT', 
         body: ({ slideData: slideData.value, newtype: selectedOption.value })
     })
  return saveSuccess
}

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