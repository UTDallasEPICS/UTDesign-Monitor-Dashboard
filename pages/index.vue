<script setup lang="ts">


</script>

<template lang="pug">
div.mx-auto.mt-7.absolute
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
NuxtPage
</template>
