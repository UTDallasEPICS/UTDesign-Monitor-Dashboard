<template lang="pug">
    div.mt-7.gap-2.border-4.bg-fuchsia-100.border-gray-300.rounded-xl.shadow-2xl.flex.buttons.justify-between
      button.px-4.py-2.shadow-2xl.bg-fuchsia-200.rounded-lg
        NuxtLink(to="/") Home
      button.px-4.py-2.shadow-2xl.bg-red-200.rounded-lg
        NuxtLink(to="/remove-dashboard") Remove Shared Dashboards
      button.px-4.py-2.shadow-2xl.bg-fuchsia-200.rounded-lg() 
        NuxtLink(to="/current-users") Current Users
      button.px-4.py-2.shadow-2xl.bg-red-200.rounded-lg
        NuxtLink(to="/new-user") New User
      button.px-4.py-2.shadow-2xl.bg-red-100.rounded-lg(v-if="isLoggedIn")
        a(href="/api/login/logout") Logout
</template>