<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Slide } from '@/types.d.ts'
import { useRoute } from 'vue-router'

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

const inputUrl = ref('');

async function updateDuration() {
   duration.value = inputDuration.value
   const saveSuccess  = await $fetch('/api/Slide/slide', { 
         method: 'PUT', // RESTful APIs are generally for CRUD operations, which are basic database operations
         body: ({ slideData: slideData.value, duration: duration.value})
     })
    console.log(saveSuccess)
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

  const saveSuccess = $fetch('/api/Slide/slide', {
    method: 'PUT',
    body: ({ slideData: slideData.value, newURL: imageUrl.value })
  });

  console.log("Image URL updated:", imageUrl.value);
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

  const saveSuccess = $fetch('/api/Slide/slide', {
    method: 'PUT',
    body: ({ slideData: slideData.value, newURL: videoLink.value })
  });

  console.log("Video URL updated:", videoLink.value);
}

// Update website URL
async function updateWebsiteUrl() {
  websiteUrl.value = inputWebsiteUrl.value
   const saveSuccess  = await $fetch('/api/Slide/slide', { 
         method: 'PUT', // RESTful APIs are generally for CRUD operations, which are basic database operations
         body: ({ slideData: slideData.value, newURL: websiteUrl.value})
     })
    console.log(saveSuccess)
  return saveSuccess
}


async function updateSlideType() {
    const saveSuccess  = await $fetch('/api/Slide/slide', { 
         method: 'PUT', 
         body: ({ slideData: slideData.value, newtype: selectedOption.value, duration: duration.value})
     })
  return saveSuccess
}

</script>
<template lang="pug">
  MDBody
    MDHeader
    div.bg-white.border-4.border-gray-300.rounded-xl.w-full.max-w-2xl.p-16.shadow-2xl.items-center.flex.flex-col.space-y-4
      div.grid-cols-3.row-span-1.flex.justify-between.space-x-32
        NuxtLink(:to="`/EditDashboard/${dashboardCuid}/${(parseInt(slideIndex, 10) - 1)}`" v-if="slideIndex > 1")
          button.mt-4.bg-purple-200.px-4.py-1.rounded-lg.text-base.font-semibold.hover_bg-purple-300.transition(v-if="slideIndex > 1") Previous
        NuxtLink(:to="`/EditDashboard/${dashboardCuid}`" v-if="slideIndex <= 1")
          button.mt-4.bg-purple-200.px-4.py-1.rounded-lg.text-base.font-semibold.hover_bg-purple-300.transition(v-if="slideIndex <= 1") Back
        div.mb-8
          label(for="select-option" class="block text-lg font-semibold mb-2") Select Type:
          select#select-option.w-full.px-4.py-2.border.border-gray-300.rounded-lg(v-model="selectedOption" @change="updateSlideType")
            option(value="") -- Select --
            option(value="image") Image
            option(value="video") Video
            option(value="website") Website
        NuxtLink(:to="`/EditDashboard/${dashboardCuid}/${parseInt(slideIndex) + 1}`" v-if="slideIndex == lastIndex") 
          button.mt-4.bg-purple-200.px-4.py-1.rounded-lg.text-base.font-semibold.hover_bg-purple-300.transition(@click="createSlide" v-if="slideIndex == lastIndex") New Slide
        NuxtLink(:to="`/EditDashboard/${dashboardCuid}/${parseInt(slideIndex) + 1}`" v-if="slideIndex != lastIndex")
          button.mt-4.bg-purple-200.px-4.py-1.rounded-lg.text-base.font-semibold.hover_bg-purple-300.transition(v-if="slideIndex != lastIndex") Next

      div.mb-8
        // Image Section
        div(v-if="selectedOption === 'image'")
          label(for="image-url" class="block text-lg font-semibold mb-2") Enter Image URL:
          input#image-url(type="text" v-model="inputImageUrl" placeholder="Enter image URL" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300")
          button.hover_bg-purple-300.transition(@click="updateImageUrl" class="mt-4 bg-purple-200 px-4 py-2 rounded-lg text-base font-semibold hover:bg-purple-300 transition") Submit

          div.mt-5
            img(:src="imageUrl" alt="" class="w-48 h-auto rounded-lg border border-gray-300")

        // Video Section
        div(v-if="selectedOption === 'video'")
          label(for="video-url" class="block text-lg font-semibold mb-2") Enter Video URL:
          input#video-url(type="text" v-model="inputVideoUrl" placeholder="Enter video or YouTube URL" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300")
          button.hover_bg-purple-300.transition(@click="updateVideoLink" class="mt-4 bg-purple-200 px-4 py-2 rounded-lg text-base font-semibold hover:bg-purple-300 transition") Submit

          div.relative.flex.items-center.justify-center.h-64.overflow-hidden.mt-8
            iframe(v-if="isYouTube" :src="videoLink" class="w-full h-full border border-gray-300 rounded-lg" allowfullscreen)
            video(v-else autoplay loop muted controls class="absolute z-10 w-auto h-auto" :key="videoLink")
              source(:src="videoLink" type="video/mp4")

        // Website Section
        div(v-if="selectedOption === 'website'" class="relative" @mouseenter="showDisclaimer = true" @mouseleave="showDisclaimer = false")
          div.relative.flex.items-center.mb-2
            span(v-if="showDisclaimer" class="absolute -top-6 left-0 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-lg text-gray-800 text-xs whitespace-nowrap") | Note: Websites with ".com" may not work properly.
          label(for="website-url" class="block text-lg font-semibold mb-2") Enter Website URL:
          input#website-url(type="text" v-model="inputWebsiteUrl" placeholder="Enter website URL" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300")
          button.hover_bg-purple-300.transition(@click="updateWebsiteUrl" class="mt-4 bg-purple-200 px-4 py-2 rounded-lg text-base font-semibold hover:bg-purple-300 transition") Submit

          div.mt-5.h-72
            iframe(v-if="websiteUrl" :src="websiteUrl" class="w-full h-full border border-gray-300 rounded-lg" allowfullscreen)
      div.mb-8
        label.block.text-lg.font-semibold.mb-2(for="slide-duration") Enter Slide Duration:
        input#slide-duration.w-full.px-4.py-2.border.border-gray-300.rounded-lg(type="text" v-model="inputDuration" placeholder="Enter in seconds")
        button.hover_bg-purple-300.transition.mt-4.bg-purple-200.px-4.py-2.rounded-lg.text-base.font-semibold(@click="updateDuration") Submit
</template>