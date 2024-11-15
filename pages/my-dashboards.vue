<script setup lang="ts">
import { ref } from 'vue'

// Reactive array to store dashboards (start with an empty array)
const dashboards = ref([])

// Function to add a new dashboard row
const addDashboard = () => {
  const newIndex = dashboards.value.length + 1
  dashboards.value.push({
    name: `Dashboard ${newIndex}`,
    url: 'http://google.com',
    selected: false  // Add a 'selected' property to track deletion
  })
}

// Function to delete selected dashboards with confirmation
const deleteSelectedDashboards = () => {
  const selectedCount = dashboards.value.filter(dashboard => dashboard.selected).length

  if (selectedCount === 0) {
    alert('No dashboards selected for deletion.')
    return
  }

  // Confirm with the user before deletion
  const confirmed = window.confirm(`Are you sure you want to delete ${selectedCount} dashboard(s), this is not reversable?`)

  if (confirmed) {
    dashboards.value = dashboards.value.filter(dashboard => !dashboard.selected)
  }
}

</script>

<template lang="pug">
div.bg-purple-200.min-h-screen.w-screen.flex(class="flex flex-col space-y-4")
  MDHeader
  div.min-h-screen.w-screen.justify-center.items-center(class="flex flex-col space-y-4")
    div.bg-purple-200.p-10.bg-white.border.rounded-md.w-full.max-w-2xl
        div.flex.justify-between.mb-4
            button.bg-gray-200.px-4.py-2.rounded 
                NuxtLink(to="/") Back
            h2.text-xl.font-semibold My Dashboards

        div.grid.grid-cols-1.gap-6
            div(v-if="dashboards.length === 0") No dashboards added yet.

            div(v-for="(dashboard, index) in dashboards" :key="index" class="border p-6 bg-white rounded shadow-md w-full")
                div.font-semibold {{ dashboard.name }}
                div 
                    a(:href="dashboard.url" class="text-blue-500") {{ dashboard.url }}
                div.mt-2 
                    input(type="checkbox" v-model="dashboard.selected")  
                    // Bind checkbox to 'selected'
                    span Delete

        div.mt-8.flex.justify-between
            button.bg-purple-200.px-4.py-2.rounded(@click="addDashboard") Add Dashboard
                NuxtLink(to="/EditDashboard/0") 
            button.bg-red-200.px-4.py-2.rounded(@click="deleteSelectedDashboards") Delete Selected
</template>
