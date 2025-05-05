<template lang="pug">
    div.bg-white.border-4.border-gray-300.rounded-xl.w-full.max-w-2xl.p-16.shadow-2xl.justify-center.flex.flex-col.space-y-4
        div.mb-8
            label.block.text-lg.font-semibold.mb-2(for="dashboard-name") Enter New Name for Dashboard:
            input#dashboard-name.w-full.px-4.py-2.border.border-gray-300.rounded-lg(type="text" v-model="newName" placeholder="Enter Dashboard Name")
            button.mt-4.bg-purple-200.px-4.py-2.rounded-lg.text-base.font-semibold.hover_bg-purple-300.transition(@click="updateNewName")
                NuxtLink(:to="`/EditDashboard/${dashboardCuid}`") Submit
</template>
    

<script setup lang="ts">
import { ref } from 'vue'
import type { Dashboard } from '@/types.d.ts' 
import { useRoute } from 'vue-router'


const newName = ref('')
const route = useRoute()
const dashboardCuid = route.params.dashboard_id
async function updateNewName() {
    const saveSuccess  = await $fetch('/api/Dashboard/dashboard', { 
         method: 'PUT', 
         body: { cuid: dashboardCuid, name: newName.value }
     })
    return saveSuccess
}



</script>