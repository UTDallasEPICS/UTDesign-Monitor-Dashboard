<script setup lang="ts">

const previewUrl = ref(); // Set the initial preview URL here
const showDropdown = ref(false); // Toggle for dropdown visibility
import type { Dashboard } from '@/types.d.ts'
import type { Slide } from '@/types.d.ts'

// Function to toggle the dropdown visibility
function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

const route = useRoute()
const dashboardCuid = route.params.dashboard_id

const { data: dashboardData } = await useFetch<Dashboard>('/api/Dashboard/dashboard', { // this is where the data is fetched for the slide on the page
    method: 'GET',
    query: { 
      cuid : dashboardCuid
    }
})
const dashboardName = ref(dashboardData.value?.name)

const { data: slides } = await useFetch<Slide[]>('/api/Slide/slides', {
  method: 'GET',
  query: { dashboardCuid },
});

const currentSlideIndex = ref(1);

// Navigate to the previous slide
function prevSlide() {
  if (currentSlideIndex.value > 1) {
    currentSlideIndex.value--;
  }
  
  getSlideInformation(currentSlideIndex.value)
}

// Navigate to the next slide
function nextSlide() {
  
  if (currentSlideIndex.value < slides.value?.length) {
    currentSlideIndex.value++;
  }
  getSlideInformation(currentSlideIndex.value)
}
const slideType = ref('')
async function getSlideInformation(slideIndex: number) {
  const slideData  = await $fetch('/api/Slide/slide', {
    method: 'GET',
    query: { 
      dashboardCuid: dashboardCuid,
      index: slideIndex },
  });
  slideType.value = slideData.type
  if(slideData.image == ""){
    previewUrl.value = "https://pivotaltalentsearch.com/wp-content/themes/unbound/images/No-Image-Found-400x264.png" }
  else{
    if(slideData.type == "video"){
      previewUrl.value = slideData.image + "?autoplay=1&mute=1"
    }
    else{
      previewUrl.value = slideData.image
    }
  }
}
getSlideInformation(currentSlideIndex.value)

const editing = ref(false);
const editDashboardName = ref(dashboardName.value);

function startEdit() {
  editDashboardName.value = dashboardName.value;
  editing.value = true;
}
async function saveEdit() {
  const saveSuccess = await $fetch('/api/Dashboard/dashboard', {
    method: 'PUT',
    body: ({ cuid: dashboardCuid, name: editDashboardName.value })
  })
  if (saveSuccess) {
    dashboardName.value = editDashboardName.value;
    editing.value = false;
  }
}
function cancelEdit(){
  editing.value = false;
}
</script>

<template lang="pug"> 
  div.bg-white.border-4.border-gray-300.rounded-xl.w-full.max-w-2xl.p-16.shadow-2xl
    div.flex.justify-center.space-x-8.text-blcak-500.text-lg.mb-4(v-if="!editing")
      div
        text.align.text-center
        h1 {{dashboardName}}
      button.ml-8(
      class="bg-purple-200 hover:bg-purple-300 transition px-4 py-2 rounded-lg text-base font-semibold"
      @click="startEdit"
      ) Edit
    div(v-else)
      div.flex.items-center.space-x-8.mb-4
        label.block.text-sm.font-semibold.mb-1(for="edit-dashboard-name") Dashboard Name:
        input#w-edit-dashboard-name.w-24.px-2.py-1.border.border-gray-300.rounded(
        class="focus:ring focus:ring-purple-300"
        type="text"
        v-model="editDashboardName") 
      div.flex.items-center.space-x-8.mb-4
        button.hover_bg-purple-300.transition.mt-4.bg-red-200.px-4.py-2.rounded-lg.text-base.font-semibold(@click = "saveEdit") Save
        button.hover_bg-purple-300.transition.mt-4.bg-red-200.px-4.py-2.rounded-lg.text-base.font-semibold(@click = "cancelEdit") Cancel

    div.slide-preview-container.flex.flex-col.items-center.mt-8
      div(v-if="slideType == 'image'").relative.w-full.h-96.border.border-gray-300.rounded-lg.overflow-hidden
        img(:src="previewUrl" class=" w-full h-full")
      div(v-else).relative.w-full.h-96.border.border-gray-300.rounded-lg.overflow-hidden
        iframe(:src="previewUrl" class="w-full h-full" allowfullscreen frameborder="0")
      
    div.mt-8.space-x-32.items-center.flex.justify-center
      button(class="top-1/2 transform -translate-y-1/2 bg-blue-200 p-2 rounded-full shadow")(@click="prevSlide") &#8592;
      button(class="top-1/2 transform -translate-y-1/2 bg-blue-200 p-2 rounded-full shadow")(@click="nextSlide") &#8594;

    div.buttons.flex.justify-between.mt-8
      button.bg-purple-200.px-8.py-4.rounded-lg.text-xl.font-semibold.w-full.text-center.mr-4()
        NuxtLink(:to="`/EditDashboard/${dashboardCuid}/1`") Edit
      button.bg-green-200.px-8.py-4.rounded-lg.text-xl.font-semibold.w-full.text-center()
        NuxtLink(:to="`/Dashboard/${dashboardCuid}/0`") Present
</template>
