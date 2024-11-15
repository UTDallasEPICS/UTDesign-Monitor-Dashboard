<script setup lang="ts">
import type { User } from '@/types.d.ts'
import { computed } from 'vue'

const mduser = useCookie<User>("mduser") // useCookie may get flagged in the VSCode Linter, you may ignore it.
const isLoggedIn = computed(() => mduser.value?.cuid != undefined)
const isAdmin = computed(() => mduser.value?.user_role == 'admin')


</script>

<template lang="pug">
div.mt-7.gap-2.bg-white.border-4.border-gray-300.rounded-xl.shadow-2xl.flex.buttons.justify-between.mt-8
  button.px-4.py-2.shadow-2xl.bg-fuchsia
    NuxtLink(to="/") Home
  button.px-4.py-2.shadow-2xl.bg-fuchsia(v-if="!isLoggedIn")
    a(href="/api/login/login") Login
  button.px-4.py-2.shadow-2xl.bg-fuchsia
    NuxtLink(to="/my-dashboards") My Dashboards
  button.px-4.py-2.shadow-2xl.bg-fuchsia
    NuxtLink(to="/EditDashboard/0") New Dashboard
  button.px-4.py-2.shadow-2xl.bg-red-200(v-if="isAdmin")
    NuxtLink(to="/admin") Admin
  button.px-4.py-2.shadow-2xl.bg-red(v-if="isLoggedIn")
    a(href="/api/login/logout") Logout
</template>