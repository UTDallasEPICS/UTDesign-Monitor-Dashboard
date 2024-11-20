<script setup></script>

<template lang="pug">
  div.bg-purple-200.flex.rounded-xl.justify-center.items-center
    div.mx-auto.gap-2.px-8.py-4.rounded-lg.text-xl.font-semibold.w-full.text-center.mr-4
      button.bg-gray-200.px-4.py-2
        NuxtLink(to="/") Home

      button.bg-gray-200.px-4.py-2
        NuxtLink(to="/my-dashboards") My Dashboards

      button.bg-gray-200.px-4.py-2
        NuxtLink(to="/EditDashboard/0") New Dashboard

      button.bg-gray-200.px-4.py-2
        NuxtLink(to="/admin") Admin

      button.bg-gray-200.px-4.py-2
        a(href="/api/login") Login

      button.bg-gray-200.px-4.py-2
        a(href="/api/logout") Logout
    NuxtPage
</template>
