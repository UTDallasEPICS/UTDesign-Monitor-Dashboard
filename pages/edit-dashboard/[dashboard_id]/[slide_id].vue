<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Slide } from '@/types.d.ts'
import { useRoute } from 'vue-router'

const selectedOption = ref('');

const showDisclaimer = ref(false);

const isYouTube = ref(false);
const route = useRoute()

const fullURL = route.fullPath

const dashboardCuid = route.params.dashboard_id
//const slideIndex = route.params.slide_id

const slideIdParam = route.params.slide_id;
const slideIndex = Array.isArray(slideIdParam)
  ? parseInt(slideIdParam[0], 10)
  : parseInt(slideIdParam, 10);


/*
const regex = /^.*\/([a-zA-Z0-9]+)\/(\d+)$/ 
const match = fullURL.match(regex)
const dashboardCuid = match ? match[1] : null
const slideIndex = match ? match[2] : null // need to convert this to an Int so Prisma doesn't complain
*/

const { data: slideData } = await useFetch<Slide>('/api/slide/slide', { // this is where the data is fetched for the slide on the page
    method: 'GET',
    query: { 
      dashboardCuid : dashboardCuid, 
      index: slideIndex
    }
})


// list of all slides in this dashboard, needed for size so we can know if the current slide index is the last one. 
const { data: slides } = await useFetch<Slide>('/api/slide/slides', { // linter complaining here, ignore it
  method: 'GET',
  query: {
    dashboardCuid: dashboardCuid
  }
})

async function createSlide() {
  const saveSuccess = await $fetch('/api/slide/slide', {
    method: 'POST',
    body: ({ dashboardCuid: dashboardCuid })
  })
}
const slideCuid = slideData.value?.cuid

async function deleteSlide(){
  
  const confirmed = window.confirm(`Are you sure you want to delete this slide, this is NOT reversible`)
  if(confirmed){
    const deleteSuccess = await $fetch('/api/slide/slide', {
    method: 'DELETE',
    body: ({ slideCuid: slideCuid, dashboardCuid: dashboardCuid, index: slideIndex })
    })
    return deleteSuccess  
  }
  
}

const lastIndex = slides.value.length // recall that indexes for slides start from 1, not 0

const duration = ref(slideData.value?.duration) || 10

const slideUrl = ref(slideData.value?.url) || ref('https://example.com/image.jpg');

const slideType = ref(slideData.value?.type) || ref('image');

async function updateSlide() {
  const saveSuccess = await $fetch('/api/slide/slide', {
    method: 'PUT',
    body: ({ slideData: slideData.value, newURL: slideUrl.value, newtype: slideType.value, duration: duration.value })
  })
  return saveSuccess
}

const editing = ref(false);
const editDuration = ref(duration.value);
const editSlideType = ref(slideType.value);
const editUrl = ref(slideUrl.value);

function startEdit() {
  editDuration.value = duration.value;
  editSlideType.value = slideType.value;
  editing.value = true;
}

function saveEdit() {
  duration.value = editDuration.value;
  slideType.value = editSlideType.value;
  if(slideType.value == 'video'){
    const youtubeMatch = editUrl.value?.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w\-]{11})/
    );

    if (youtubeMatch) {
      slideUrl.value = `https://www.youtube.com/embed/${youtubeMatch[1]}`;
      isYouTube.value = true;
    }   else {
      slideUrl.value = editUrl.value;
      isYouTube.value = false;
    }
  }
  else{
    slideUrl.value = editUrl.value;
  }
  updateSlide()
  editing.value = false;
  // Optionally emit an event or call an API here
}

function cancelEdit() {
  editing.value = false;
}

</script>

<template lang="pug">
    div.bg-white.border-4.border-gray-300.rounded-xl.w-full.max-w-2xl.p-16.shadow-2xl.items-center.flex.flex-col.space-y-4
      h1 Slide {{slideIndex}} of {{lastIndex}}
      div.grid-cols-3.row-span-1.flex.justify-between.space-x-64
        NuxtLink(:to="`/edit-dashboard/${dashboardCuid}/${(parseInt(slideIndex, 10) - 1)}`" v-if="slideIndex > 1")
          button.mt-4.bg-purple-200.px-4.py-1.rounded-lg.text-base.font-semibold.hover_bg-purple-300.transition(v-if="slideIndex > 1") Previous
        NuxtLink(:to="`/dashboard/${dashboardCuid}`" v-if="slideIndex <= 1")
          button.mt-4.bg-purple-200.px-4.py-1.rounded-lg.text-base.font-semibold.hover_bg-purple-300.transition(v-if="slideIndex <= 1") Back
        NuxtLink(:to="`/edit-dashboard/${dashboardCuid}/${parseInt(slideIndex) + 1}`" v-if="slideIndex == lastIndex") 
          button.mt-4.bg-purple-200.px-4.py-1.rounded-lg.text-base.font-semibold.hover_bg-purple-300.transition(@click="createSlide" v-if="slideIndex == lastIndex") New Slide
        NuxtLink(:to="`/edit-dashboard/${dashboardCuid}/${parseInt(slideIndex) + 1}`" v-if="slideIndex != lastIndex")
          button.mt-4.bg-purple-200.px-4.py-1.rounded-lg.text-base.font-semibold.hover_bg-purple-300.transition(v-if="slideIndex != lastIndex") Next

      div(v-if="slideType === 'video'" class = "w-full h-96")
        div.relative.flex.items-center.justify-center.h-64.overflow-hidden.mt-8
            iframe(:src="slideUrl" class="w-full h-full border border-gray-300 rounded-lg" allowfullscreen)
    
      div(v-if="slideType === 'image'")
        div.mt-8.w-full.h-72.flex.items-center.justify-center.overflow-hidden
          img(
            :src="slideUrl"
            alt=""
            class="object-contain w-full h-full rounded-lg border border-gray-30"
          )

      div(v-if="slideType === 'website'" class = "w-full h-96")
        div.w-full.h-full.flex.items-center.justify-center.overflow-hidden
          iframe(
          :src="slideUrl"
          class="object-contain w-full h-full rounded-lg border border-gray-300 "
          style="width: 100%; height: 80%;"
          allowfullscreen
        )
    div.bg-white.border-4.border-gray-300.rounded-xl.w-full.max-w-2xl.p-16.shadow-2xl.items-center.flex.flex-col.space-y-4
      div.flex.items-center.space-x-8.text-gray-500.text-sm.mb-4(v-if="!editing")
        div
          span.font-semibold.text-gray-700 Duration:
          span.ml-2 {{ duration }} seconds
        div
          span.font-semibold.text-gray-700 Slide type:
          span.ml-2.capitalize {{ slideType }}
        button.ml-8(
        class="bg-purple-200 hover:bg-purple-300 transition px-4 py-2 rounded-lg text-base font-semibold"
        @click="startEdit"
        ) Edit
      div(v-else)
        div.flex.items-center.space-x-8.mb-4
          label.block.text-sm.font-semibold.mb-1(for="edit-duration") Duration (seconds):
          input#w-edit-duration.w-24.px-2.py-1.border.border-gray-300.rounded(
          class="focus:ring focus:ring-purple-300"
          type="number"
          min="1"
          v-model="editDuration"
          )
        div.flex.items-center.space-x-8.mb-4
          label.block.text-sm.font-semibold.mb-1(for="edit-slide-type") Slide Type:
          select#w-edit-slide-type.w-32.px-2.py-1.border.border-gray-300.rounded(
          class="focus:ring focus:ring-purple-300"
          v-model="editSlideType"
          )
            option(value="image") Image
            option(value="video") Video
            option(value="website") Website
        div.flex.items-center.space-x-8.mb-4
          div
            label(v-if="editSlideType === 'image'" for="url" class="block text-sm font-semibold mb-1") Enter Image URL:
            label(v-if="editSlideType === 'video'" for="url" class="block text-sm font-semibold mb-1") Enter Video URL:
            div(v-if="editSlideType === 'website'" class="relative" @mouseenter="showDisclaimer = true" @mouseleave="showDisclaimer = false").relative.flex.items-center.mb-2
              span(v-if="showDisclaimer" class="absolute -top-6 left-0 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-lg text-gray-800 text-xs whitespace-nowrap") | Note: Websites with ".com" may not work properly.
            label(v-if="editSlideType === 'website'" for="url" class="block text-sm font-semibold mb-1") Enter Website URL:
            input#url(type="text" v-model="editUrl" placeholder="Enter URL" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300")
      
        div.flex.items-center.space-x-8.mb-4
          button.hover_bg-purple-300.transition.mt-4.bg-red-200.px-4.py-2.rounded-lg.text-base.font-semibold(@click = "saveEdit") Save
          button.hover_bg-purple-300.transition.mt-4.bg-red-200.px-4.py-2.rounded-lg.text-base.font-semibold(@click = "cancelEdit") Cancel

      div.flex.items-center.space-x-8.mb-4
        div(v-if="lastIndex > 1").mb-8 
          NuxtLink(:to="`/edit-dashboard/${dashboardCuid}/${slideIndex-1}`" v-if="slideIndex > 1")
            button.hover_bg-purple-300.transition.mt-4.bg-red-200.px-4.py-2.rounded-lg.text-base.font-semibold(@click="deleteSlide") Delete Slide
          NuxtLink(:to="`/edit-dashboard/${dashboardCuid}/${slideIndex+1}`" v-if="slideIndex == 1")
            button.hover_bg-purple-300.transition.mt-4.bg-red-200.px-4.py-2.rounded-lg.text-base.font-semibold(@click="deleteSlide") Delete Slide 
    

  </template>