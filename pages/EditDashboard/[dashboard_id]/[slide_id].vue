<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Slide } from '@/types.d.ts'
import { useRoute } from 'vue-router'

const inputImageUrl = ref('');
const imageUrl = ref('https://example.com/image.jpg');

const inputVideoUrl = ref('');
const videoLink = ref('https://example.com/sample-video.mp4');

const route = useRoute()

// Full URL
const fullURL = route.fullPath

const regex = /^.*\/([a-zA-Z0-9]+)\/(\d+)$/ 
const match = fullURL.match(regex)
const dashboardCuid = match ? match[1] : null
const slideIndex = match ? match[2] : null // need to convert this to an Int so Prisma doesn't complain

const { data: slideData } = await useFetch<Slide>('/api/Slide/slide', {
    method: 'GET',
    query: { 
      dashboardCuid : dashboardCuid, 
      index: slideIndex
    }
})

const inputDuration = ref('');
const duration = ref(slideData.value.duration)


function updateImageUrl() {
  imageUrl.value = inputImageUrl.value;
}

function updateVideoLink() {
  videoLink.value = inputVideoUrl.value;
}


async function updateDuration() {
   duration.value = inputDuration.value
   const saveSuccess  = await $fetch('/api/Slide/slide', { 
         method: 'PUT', 
         body: ({ slideData: slideData.value, duration: duration.value })
     })
  return saveSuccess
}

</script>

<template lang="pug">
MDBody
  MDHeader
  div.bg-white.border-4.border-gray-300.rounded-xl.w-full.max-w-2xl.p-16.shadow-2xl.items-center.flex.flex-col.space-y-4
    div.mb-8
      label.block.text-lg.font-semibold.mb-2(for="image-url") Enter Image URL:
      input#image-url.w-full.px-4.py-2.border.border-gray-300.rounded-lg(type="text" v-model="inputImageUrl" placeholder="Enter image URL")
      button.mt-4.bg-purple-200.px-4.py-2.rounded-lg.text-base.font-semibold(@click="updateImageUrl") Submit
      div.mt-5
        img.w-48.h-auto.rounded-lg.border.border-gray-300(:src="imageUrl" alt="")
    div.mb-8
      label.block.text-lg.font-semibold.mb-2(for="video-url") Enter Video URL:
      input#video-url.w-full.px-4.py-2.border.border-gray-300.rounded-lg(type="text" v-model="inputVideoUrl" placeholder="Enter video URL")
      button.mt-4.bg-purple-200.px-4.py-2.rounded-lg.text-base.font-semibold(@click="updateVideoLink") Submit

      div.relative.flex.items-center.justify-center.h-64.overflow-hidden.mt-5
        video.absolute.z-10.w-auto.h-auto(autoplay loop muted :key="videoLink")
          source(:src="videoLink" type="video/mp4")
    div.mb-8
      label.block.text-lg.font-semibold.mb-2(for="slide-duration") Enter Slide Duration:
      input#slide-duration.w-full.px-4.py-2.border.border-gray-300.rounded-lg(type="text" v-model="inputDuration" placeholder=`Enter in seconds`)
      button.mt-4.bg-purple-200.px-4.py-2.rounded-lg.text-base.font-semibold(@click="updateDuration") Submit
</template>

<style scoped>
.rounded-xl {
  border-radius: 1rem;
}

.shadow-2xl {
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
}

input {
  transition: border-color 0.2s ease;
}

input:focus {
  border-color: #a78bfa;
  outline: none;
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

.w-48 {
  width: 12rem;
}

.h-64 {
  height: 16rem;
}

body {
  overflow-x: hidden;
}
</style>
