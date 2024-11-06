<script setup lang="ts">
// dashboard id set to probably the cuid fetched from prisma (database)

// 

</script>

<template lang="pug">
div.mx-auto.mt-20.absolute
  div.mx-auto.gap-2
    button
      NuxtLink(to="/") Home
    button 
      NuxtLink(to="/my-dashboards") my dashboards
    button
      NuxtLink(to="/shared-dashboards") shared dashboards
    button
      NuxtLink(to="/new-dashboard") new dashboard
    button
      NuxtLink(to="/admin") Admin
    button.bg-gray-200.px-4.py-2
      NuxtLink(to="/ball") ball
NuxtPage
</template>



