<template>
  <div class="flex flex-wrap gap-4 items-center mb-6">
    <div v-if="ownedDashboardsToggle" @click="toggle">
      <button class="text-2xl font-semibold rounded-md flex items-center justify-center">
        <Icon icon="fluent:arrow-sort-16-filled" class="mr-2 text-2xl" />
        My Dashboards
      </button>
    </div>
    <div v-if="!ownedDashboardsToggle" @click="toggle">
      <button class="text-2xl font-semibold rounded-md flex items-center justify-center">
        <Icon icon="fluent:arrow-sort-16-filled" class="mr-2 text-2xl" />
        All Dashboards
      </button>
    </div>
    <button class="custom-button flex items-center justify-center" @click="addDashboard">
      <Icon icon="mingcute:add-fill" class="mr-2 text-xl" />
      Add Dashboard
      <NuxtLink to="/EditDashboard/0"></NuxtLink>
    </button>
    <button
      class="custom-button flex items-center justify-center"
      v-if="mduser.user_role == 'admin' || ownedDashboardsToggle"
      @click="deleteSelectedDashboards"
    >
      <Icon icon="tabler:trash" class="mr-2 text-xl" />
      Delete Selected
    </button>
  </div>

  <div class="grid grid-cols-5 gap-4">
    <div v-if="(ownedDashboardsToggle ? ownedDashboards : dashboards).length === 0" class="col-span-5 text-center">
      No dashboards added yet.
    </div>

    <div
      class="border p-4 bg-white rounded shadow-md w-full"
      v-for="(dashboard, index) in (ownedDashboardsToggle ? ownedDashboards : dashboards)"
      :key="index"
    >
      <div class="font-semibold mb-2">{{ dashboard.name }}</div>
      <img :src="getPreviewImage(dashboard)" alt="Dashboard Preview" class="w-full h-30" />
      <p class="mt-2">Author: {{ dashboard.owner.name }}</p>
      <div class="flex items-center gap-4 mt-4">
        <NuxtLink class="custom-button" :to="`/Dashboard/${dashboard.cuid}`">
          <button class="flex justify-center items-center">
            <Icon icon="heroicons:magnifying-glass" class="mr-2 text-xl" />
            View
          </button>
        </NuxtLink>
        <div
          class="flex items-center gap-2"
          v-if="mduser.user_role == 'admin' || ownedDashboardsToggle"
        >
          <input type="checkbox" class="w-4 h-4" v-model="dashboard.selected" />
          <span>Delete</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Dashboard, User } from '@/types.d.ts'
import { Icon } from '@iconify/vue'

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
      preview: res[i].preview,
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

  // Clear and update the dashboards to show preview
  dashboards.value = []
  ownedDashboards.value = []
  await getDashboards()

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

const defaultPreviewUrl = "https://images.unsplash.com/photo-1744614053463-491122164435?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

// Update backend to allow users to add their preview
const getPreviewImage = (dashboard: { preview: string }) => {
  return dashboard.preview && dashboard.preview.trim() !== "" // Check if the user provided a non-empty string
    ? dashboard.preview
    : defaultPreviewUrl
}

//calling function
getDashboards()
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