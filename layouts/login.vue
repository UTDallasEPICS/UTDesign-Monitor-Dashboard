<template>
    <div>
      <main class="max-w-screen-sm mt-[10%] mx-auto p-4 shadow-lg rounded-md border-green-700 border-2 bg-orange-50">
        <a href="/api/login/login">
          <button class="px-4 py-2 shadow-2xl bg-green-100 rounded-lg hover:bg-green-200" v-if="!isUser">
            Login
          </button>
        </a>
        <slot />
      </main>
    </div>
  </template>

<script setup lang="ts">
import type { User } from '@/types.d.ts'
const mduser = useCookie<User>('mduser');
import { computed } from 'vue'
const isUser = computed(() => (mduser.value?.user_role == 'admin' || mduser.value?.user_role == 'user'))
</script>

<style scoped>
    .router-link-exact-active {font-weight: bolder;}
</style>