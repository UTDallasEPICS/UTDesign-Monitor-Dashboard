<script setup lang="ts">


</script>

<template lang="pug">
div.mx-auto.mt-7.absolute
  div.mx-auto.gap-2
    button
        NuxtLink(to="/") Home
    button 
        NuxtLink(to="/current-users") Current Users
    button
        NuxtLink(to="/new-user") New User
    button
        NuxtLink(to="/add-admin") Add Admin
    button
        NuxtLink(to="/remove-dashboard") Remove Shared Dashboards
NuxtPage
</template>
    