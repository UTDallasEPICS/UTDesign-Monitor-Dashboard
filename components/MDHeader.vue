<script setup></script>

<template lang="pug">
    div.mx-auto.mt-20.absolute
      div.mx-auto.gap-2
        button.bg-gray-200.px-4.py-2
          NuxtLink(to="/") Home
        button.bg-gray-200.px-4.py-2
          NuxtLink(to="/my-dashboards") My Dashboards
        button.bg-gray-200.px-4.py-2 
          NuxtLink(to="/new-dashboard") New Dashboard
        button.bg-gray-200.px-4.py-2
          NuxtLink(to="/admin") Admin
        button.bg-gray-200.px-4.py-2
          a(href="/api/login") Login
        button.bg-gray-200.px-4.py-2
          a(href="/api/logout") Logout
      NuxtPage
    </template>