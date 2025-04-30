<template>
    <div class="flex justify-center items-center">
        <div class="bg-white border-4 border-gray-300 rounded-xl w-full max-w-2xl p-16 shadow-2xl justify-center flex flex-col space-y-4">
            <div class="mb-8">
                <label for="dashboard-name" class="block text-lg font-semibold mb-2">
                    Enter New Name for Dashboard:
                </label>
                <input
                id="dashboard-name"
                type="text"
                v-model="newName"
                placeholder="Enter Dashboard Name"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <NuxtLink :to="`/EditDashboard/${dashboardCuid}`">
                    <button
                    @click="updateNewName"
                    class="custom-button mt-4 bg-purple-200 px-4 py-2 rounded-lg text-base font-semibold hover:bg-purple-300 transition"
                    >
                        Submit
                    </button>
                </NuxtLink>
            </div>
        </div>
    </div>
  </template>
    

<script setup lang="ts">
import { ref } from 'vue'
import type { Dashboard } from '@/types.d.ts' 
import { useRoute } from 'vue-router'


const newName = ref('')
const route = useRoute()
const url = route.fullPath
const regex = /\/EditDashboard\/([a-zA-Z0-9]+)/;
const match = url.match(regex);
const dashboardCuid = match ? match[1] : null
async function updateNewName() {
    const saveSuccess  = await $fetch('/api/Dashboard/dashboard', { 
         method: 'PUT', 
         body: { cuid: dashboardCuid, name: newName.value }
     })
    return saveSuccess
}



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