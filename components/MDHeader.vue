<!-- <script setup lang="ts">
import type { User } from '@/types.d.ts'
import { computed } from 'vue'

const mduser = useCookie<User>("mduser") // useCookie may get flagged in the VSCode Linter, you may ignore it.
const isLoggedIn = computed(() => mduser.value?.cuid != undefined)
const isAdmin = computed(() => mduser.value?.user_role == 'admin')


</script>

<template lang="pug">
div.mt-7.gap-2.border-4.bg-fuchsia-100.border-gray-300.rounded-xl.shadow-2xl.flex.buttons.justify-between.p-2
  NuxtLink(to="/")
    button.px-4.py-2.shadow-2xl.bg-fuchsia-200.rounded-lg.hover_bg-fuchsia-300 Home
  a(href="/api/login/login") 
    button.px-4.py-2.shadow-2xl.bg-green-100.rounded-lg.hover_bg-green-200(v-if="!isLoggedIn") Login
  NuxtLink(to="/dashboardlist")
    button.px-4.py-2.shadow-2xl.bg-fuchsia-200.rounded-lg.hover_bg-fuchsia-300(v-if="isLoggedIn") Dashboards
  NuxtLink(to="/admin")
    button.px-4.py-2.shadow-2xl.bg-red-100.rounded-lg.hover_bg-red-300(v-if="isAdmin") Admin
  a(href="/api/login/logout") 
    button.px-4.py-2.shadow-2xl.bg-red-200.rounded-lg.hover_bg-red-400(v-if="isLoggedIn") Logout
</template> -->

<template>
  <div>

  </div>
</template>

<script setup>

</script>

<style scoped>

</style>