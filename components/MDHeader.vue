<script setup></script>

<template lang="pug">
    div.mt-20
      div.mx-auto.gap-2
        button.bg-gray-200.px-4.py-2
          NuxtLink(to="/") Home
        button.bg-gray-200.px-4.py-2
          NuxtLink(to="/my-dashboards") My Dashboards
        button.bg-gray-200.px-4.py-2 
          NuxtLink(to="/EditDashboard/0") New Dashboard
        button.bg-gray-200.px-4.py-2
          NuxtLink(to="/admin") Admin
        button.bg-gray-200.px-4.py-2
          a(href="/api/login/login") Login
        button.bg-gray-200.px-4.py-2
          a(href="/api/login/logout") Logout
      NuxtPage
</template>