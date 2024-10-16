<script setup lang="ts">


</script>

<template lang="pug">
div.mx-auto.mt-7.absolute
  div.mx-auto.gap-2
    button.bg-gray-200.px-4.py-2
        NuxtLink(to="/") Home
    button.bg-gray-200.px-4.py-2
        NuxtLink(to="/current-users") Current Users
    button.bg-gray-200.px-4.py-2
        NuxtLink(to="/new-user") New User
    button.bg-gray-200.px-4.py-2
        NuxtLink(to="/add-admin") Add Admin
    button.bg-gray-200.px-4.py-2
        NuxtLink(to="/remove-dashboard") Remove Shared Dashboards
NuxtPage
</template>
    

