import { createApp } from 'vue'
import App from './App.vue'
import 'main.css'  // Adjust the path to where your CSS file is located

createApp(App).mount('#app')

<script setup lang="ts">
</script>

<template lang="pug">
div.mx-auto.mt-7.absolute
  div.mx-auto.gap-2
    button.bg-gray-200.px-4.py-2
      NuxtLink(to="/") Home
    button.bg-gray-200.px-4.py-2
      NuxtLink(to="/my-dashboards") My Dashboards
    button.bg-gray-200.px-4.py-2 
      NuxtLink(to="/shared-dashboards") Shared Dashboards
    button.bg-gray-200.px-4.py-2 
      NuxtLink(to="/new-dashboard") New Dashboard
    button.bg-gray-200.px-4.py-2
      NuxtLink(to="/admin") Admin
  NuxtPage
</template>


