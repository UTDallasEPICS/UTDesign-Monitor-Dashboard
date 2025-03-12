<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const previewUrl = ref("https://en.wikipedia.org/wiki/Main_Page"); // Set the initial preview URL here
const showDropdown = ref(false); // Toggle for dropdown visibility

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

const route = useRoute()
const url = route.fullPath
const regex = /\/EditDashboard\/([a-zA-Z0-9]+)/;
const match = url.match(regex);
const dashboardCuid = match ? match[1] : null

</script>

<template lang="pug">
MDBody
    MDHeader
    div.bg-white.border-4.border-gray-300.rounded-xl.w-full.max-w-2xl.p-16.shadow-2xl.justify-center.flex.flex-col.space-y-4
        // this is a preview of the slide
        div.slide-button-container.flex.justify-center.items-center.mb-10
            iframe.w-full.h-full.rounded-lg(:src="previewUrl" allow="fullscreen" frameborder="0")
        // Other buttons below
        div.buttons.flex.justify-between.mt-8.gap-4
            button.bg-purple-200.px-8.py-4.rounded-lg.text-xl.font-semibold.w-full.text-center.mr-4.hover_bg-purple-300()
                NuxtLink(:to="`/EditDashboard/${dashboardCuid}/1`") Edit
            div.relative.mr-4
                button.bg-gray-200.px-8.py-4.rounded-lg.text-xl.font-semibold.w-full.text-center.hover_bg-gray-300(@click="toggleDropdown") Other
                // Dropdown Menu
                div.absolute.bg-white.border.border-gray-300.rounded-lg.mt-2.shadow-lg.w-full.transition(v-if="showDropdown")
                    NuxtLink.block.px-4.py-2.text-gray-700.hover_bg-gray-100(:to="`/EditDashboard/${dashboardCuid}/post`") Post
                    NuxtLink.block.px-4.py-2.text.gray-700.hover_bg-gray-100(:to="`/Dashboard/${dashboardCuid}/1`") Preview
                    NuxtLink.block.px-4.py-2.text-gray-700.hover_bg-gray-100(:to="`/EditDashboard/${dashboardCuid}/rename`") Rename
            button.bg-red-200.px-8.py-4.rounded-lg.text-xl.font-semibold.w-full.text-center.hover_bg-red-300()
                NuxtLink(:to="`/dashboardlist`") Delete
</template>
