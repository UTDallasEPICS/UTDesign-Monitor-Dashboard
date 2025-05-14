<script setup lang="ts">
import { ref } from 'vue'
import type { Device, Dashboard, User } from '@/types.d.ts'

const mduser = useCookie<User>('mduser')

const devices = ref<Device[]>([])
const dashboards = ref<Dashboard[]>([])
const selectedDashboards = ref<Record<string, string>>({})

// Load devices
const getDevices = async () => {
  const res = await $fetch('/api/device/devices')
  devices.value = res

  // Set initial selection
  res.forEach((device: Device) => {
    selectedDashboards.value[device.serialNumber] = device.dashboardCuid || ''
  })
}

// Load dashboards
const getDashboards = async () => {
  const res = await $fetch('/api/dashboard/dashboards')
  dashboards.value = res
}

// Update dashboard assignment for a device
const updateDeviceDashboard = async (serialNumber: string) => {
  const dashboardCuid = selectedDashboards.value[serialNumber]
  await $fetch('/api/device/device', {
    method: 'PUT',
    body: { serialNumber, dashboardCuid }
  })
  alert('Device updated!')
}

// Initial data fetch
await getDevices()
await getDashboards()
</script>

<template lang="pug">
div.min-h-screen.w-screen.items-center.flex.flex-col.space-y-4
  div.bg-purple-200.p-10.bg-white.border.rounded-md.w-full.max-w-2xl
    div.flex.justify-between.mb-4
      button.bg-gray-200.px-4.py-2.rounded.hover_bg-gray-300
        NuxtLink(to="/") Back
      h1.text-xl.font-semibold Devices

    div(v-if="devices.length === 0") No devices found.
    div(v-else)
      div.border.p-6.bg-white.rounded.shadow-md.w-full.mb-4(v-for="device in devices" :key="device.serialNumber")
        div.font-semibold {{ device.name }}
        div.text-sm.text-gray-600 Serial: {{ device.serialNumber }}
        div.mt-2
          span Assigned Dashboard:
          span.font-bold.ml-1 {{ device.dashboard?.name || 'None' }}
        div.mt-2
          label.block.mb-1 Select Dashboard:
          select.border.rounded.p-2(v-model="selectedDashboards[device.serialNumber]" @change="updateDeviceDashboard(device.serialNumber)")
            option(v-for="dash in dashboards" :value="dash.cuid" :key="dash.cuid") {{ dash.name }}
</template>
