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
    
  
    // for each dashboard received
    //dashboard value push
    for(let i=0; i<res.length; i++){
      dashboards.value.push({
      name: res[i].name,
      url: res[i].url,
      selected: false,  // Add a 'selected' property to track deletion
      cuid: res[i].cuid,
      owner: res[i].Owner
    });
    }
    ownedDashboards.value = dashboards.value.filter(dashboard => (dashboard.owner.cuid == mduser.value.cuid))
  
  }



// Function to add a new dashboard row
const addDashboard = async () => {
  const newIndex = dashboards.value.length + 1;
  const newName = `Dashboard ${newIndex}`;

  const tempDashboard = {
    name: newName,
    selected: false,
    cuid: null,
  };

  dashboards.value.push(tempDashboard);
  ownedDashboards.value.push(tempDashboard);

  try {
    const saveSuccess = await $fetch('/api/Dashboard/dashboard', {
      method: 'POST',
      body: { name: newName },
    });

    // get updated dashboard list
    const updatedDashboards = await $fetch('/api/Dashboard/dashboards');
    dashboards.value = updatedDashboards.map((dashboard: any) => ({
      name: dashboard.name,
      url: dashboard.url,
      selected: false, 
      cuid: dashboard.cuid,
      owner: dashboard.Owner,
    }));

    ownedDashboards.value = dashboards.value.filter(
      (dashboard) => dashboard.owner.cuid === mduser.value.cuid
    );
  } catch (error) {
    console.error('Failed to add dashboard:', error);

    // remove temporary dashboard if failure
    dashboards.value = dashboards.value.filter((dashboard) => dashboard !== tempDashboard);
    ownedDashboards.value = ownedDashboards.value.filter((dashboard) => dashboard !== tempDashboard);
    alert('Failed to add the dashboard. Please try again.');
  }
};

// Function to delete selected dashboards with confirmation
const deleteSelectedDashboards = async () => {
  const selectedDashboards = dashboards.value.filter(dashboard => dashboard.selected)
  const selectedCount = dashboards.value.filter(dashboard => dashboard.selected).length

  const selectedDashboardsCuids = selectedDashboards.map(dashboard => dashboard.cuid)

  if (selectedCount === 0) {
    alert('No dashboards selected for deletion.')
    return
  }

  // Confirm with the user before deletion
  const confirmed = window.confirm(`Are you sure you want to delete ${selectedCount} dashboard(s), this is NOT reversible`)

  if (confirmed) {
    
    const saveSucccess = await $fetch('/api/Dashboard/dashboards', {
      method: 'DELETE',
      body: ({ "cuids": selectedDashboardsCuids})
    })
    dashboards.value = dashboards.value.filter(dashboard => !dashboard.selected)
    ownedDashboards.value = ownedDashboards.value.filter(dashboard => !dashboard.selected)
  }
}

//calling function
getDashboards()
</script>

<template lang="pug">
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
