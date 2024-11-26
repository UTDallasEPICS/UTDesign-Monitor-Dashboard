<script setup lang="ts">
import { ref } from 'vue';

const selectedOption = ref('');

// Image state
const inputImageUrl = ref('');
const imageUrl = ref('https://example.com/image.jpg');

// Video state
const inputVideoUrl = ref('');
const videoLink = ref('https://example.com/sample-video.mp4');

const isYouTube = ref(false);

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
</script>

<template lang="pug">
  MDBody
    MDHeader
    div.bg-white.border-4.border-gray-300.rounded-xl.w-full.max-w-2xl.p-16.shadow-2xl.items-center.flex.flex-col.space-y-4
      div.mb-8
        label(for="select-option" class="block text-lg font-semibold mb-2") Select Type:
        select#select-option(v-model="selectedOption" class="w-full px-4 py-2 border border-gray-300 rounded-lg")
          option(value="") -- Select --
          option(value="image") Image
          option(value="video") Video
          option(value="website") Website
  
      div.mt-8
        // Image Section
        div(v-if="selectedOption === 'image'")
          label(for="image-url" class="block text-lg font-semibold mb-2") Enter Image URL:
          input#image-url(type="text" v-model="inputImageUrl" placeholder="Enter image URL" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300")
          button(@click="updateImageUrl" class="mt-4 bg-purple-200 px-4 py-2 rounded-lg text-base font-semibold hover:bg-purple-300 transition") Submit
  
          div.mt-5
            img(:src="imageUrl" alt="" class="w-48 h-auto rounded-lg border border-gray-300")
  
        // Video Section
        div(v-if="selectedOption === 'video'")
          label(for="video-url" class="block text-lg font-semibold mb-2") Enter Video URL:
          input#video-url(type="text" v-model="inputVideoUrl" placeholder="Enter video or YouTube URL" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300")
          button(@click="updateVideoLink" class="mt-4 bg-purple-200 px-4 py-2 rounded-lg text-base font-semibold hover:bg-purple-300 transition") Submit
  
          div.relative.flex.items-center.justify-center.h-64.overflow-hidden.mt-8
            iframe(v-if="isYouTube" :src="videoLink" class="w-full h-full border border-gray-300 rounded-lg" allowfullscreen)
            video(v-else autoplay loop muted controls class="absolute z-10 w-auto min-w-full min-h-full max-w-none" :key="videoLink")
              source(:src="videoLink" type="video/mp4")
  
        // Website Section
        div(v-if="selectedOption === 'website'" class="relative" @mouseenter="showDisclaimer = true" @mouseleave="showDisclaimer = false")
          div.relative.flex.items-center.mb-2
            span(v-if="showDisclaimer" class="absolute -top-6 left-0 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-lg text-gray-800 text-xs whitespace-nowrap") 
              | Note: Websites with ".com" may not work properly.
          label(for="website-url" class="block text-lg font-semibold mb-2") Enter Website URL:
          input#website-url(type="text" v-model="inputWebsiteUrl" placeholder="Enter website URL" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300")
          button(@click="updateWebsiteUrl" class="mt-4 bg-purple-200 px-4 py-2 rounded-lg text-base font-semibold hover:bg-purple-300 transition") Submit
  
          div.mt-5.h-72
            iframe(v-if="websiteUrl" :src="websiteUrl" class="w-full h-full border border-gray-300 rounded-lg" allowfullscreen)
  </template>
  