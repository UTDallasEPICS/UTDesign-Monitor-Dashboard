<script setup lang="ts">
import { ref } from 'vue'
import type { Dashboard, User } from '@/types.d.ts'

const ownedDashboardsToggle = ref(true)
const toggle = async () => { 
  ownedDashboardsToggle.value = !(ownedDashboardsToggle.value)
} 


const mduser = useCookie<User>('mduser');


// Reactive array to store dashboards (start with an empty array)
const dashboards = ref([])
const ownedDashboards = ref([])
  const getDashboards = async () => {
    // fetch list of dashboards
    const res = await $fetch("/api/Dashboard/dashboards")

    // for each dashboard recived
    //dashboard value push
    for(let i=0; i<res.length; i++){
      dashboards.value.push({
      name: res[i].name,
      url: res[i].url,
      selected: false,  // Add a 'selected' property to track deletion
      cuid: res[i].cuid,
      owner: res[i].owner
  });
    }
    ownedDashboards.value = dashboards.value.filter(dashboard => (dashboard.owner.cuid == mduser.value.cuid))
    
  }



// Function to add a new dashboard row
const addDashboard = async () => {
  const newIndex = dashboards.value.length + 1
  const newName = `Dashboard ${newIndex}`
  dashboards.value.push({
    name: newName,
    selected: false  // Add a 'selected' property to track deletion
  })
  ownedDashboards.value.push({
    name: newName,
    selected: false
  })
  const saveSuccess  = await $fetch('/api/Dashboard/dashboard', { 
        method: 'POST', // recall that POST = CREATE in CRUD!
        body: ({ name: newName })
    })
  return saveSuccess
}

// Function to delete selected dashboards with confirmation
const deleteSelectedDashboards = async () => {
  const selectedDashboards = dashboards.value.filter(dashboard => dashboard.selected)
  const selectedCount = dashboards.value.filter(dashboard => dashboard.selected).length

  if (selectedCount === 0) {
    alert('No dashboards selected for deletion.')
    return
  }

  // Confirm with the user before deletion
  const confirmed = window.confirm(`Are you sure you want to delete ${selectedCount} dashboard(s), this is NOT reversible`)

  if (confirmed) {
    for (let i = 0; i < selectedCount; i++) {
    const saveSuccess  = await $fetch('/api/Dashboard/dashboard', { 
        method: 'DELETE', 
        body: ({ cuid: selectedDashboards[i].cuid })
    })
    dashboards.value = dashboards.value.filter(dashboard => !dashboard.selected)
    ownedDashboards.value = ownedDashboards.value.filter(dashboard => !dashboard.selected)
    }
  }
}

//calling function
getDashboards()
</script>

<template lang="pug">
MDBody
  MDHeader
  div.min-h-screen.w-screen.items-center.flex.flex-col.space-y-4
    div.bg-purple-200.p-10.bg-white.border.rounded-md.w-full.max-w-2xl
        div.flex.justify-between.mb-4
            button.bg-gray-200.px-4.py-2.rounded.hover_bg-gray-300
                NuxtLink(to="/") Back
            div.bg-white.position_relative.hover_bg-fuchsia-100.rounded-full(v-if="ownedDashboardsToggle" @click="toggle")
              button
                MDUserIcon
              button.text-xl.font-semibold.rounded-md() My Dashboards
            div.bg-white.position_relative.hover_bg-fuchsia-100.rounded-full(v-if="!(ownedDashboardsToggle)" @click="toggle")
              button
                MDUsersIcon
              button.text-xl.font-semibold.rounded-md() All Dashboards
        div.grid.grid-cols-1.gap-6
            div(v-if="dashboards.length === 0") No dashboards added yet.

            div(v-if="ownedDashboardsToggle")
              div.border.p-6.bg-white.rounded.shadow-md.w-full(v-for="(dashboard, index) in ownedDashboards" :key="index")
                  div.font-semibold {{ dashboard.name }}
                  div 
                  button.bg-blue-200.px-2.py-2.rounded.hover_bg-blue-300()
                    NuxtLink(:to="`/Dashboard/${dashboard.cuid}`") View
                  div.mt-2.size-full
                      input(type="checkbox" v-model="dashboard.selected")  
                      // Bind checkbox to 'selected'
                      span Delete
            div(v-else)
              div.border.p-6.bg-white.rounded.shadow-md.w-full(v-for="(dashboard, index) in dashboards" :key="index")
                  div.font-semibold {{ dashboard.name }}
                  div 
                  button.bg-blue-200.px-2.py-2.rounded.hover_bg-blue-300()
                    NuxtLink(:to="`/Dashboard/${dashboard.cuid}`") View
                  div.mt-2.size-full(v-if="mduser.user_role == 'admin'")
                      input(type="checkbox" v-model="dashboard.selected")
                      // Bind checkbox to 'selected'
                      span Delete

        div.mt-8.flex.justify-between
            button.bg-purple-200.px-4.py-2.rounded(@click="addDashboard") Add Dashboard
                NuxtLink(to="/EditDashboard/0")
            button.bg-red-200.px-4.py-2.rounded(v-if="mduser.user_role == 'admin' || (ownedDashboardsToggle)" @click="deleteSelectedDashboards") Delete Selected
</template>
