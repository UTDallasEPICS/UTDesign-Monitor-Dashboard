<template>
    <div>
      <main class="max-w-screen-md mt-[10%] mx-auto p-4 shadow-lg rounded-md border-green-700 border-2 bg-orange-50">
        <p class="mb-4 text-center text-lg">Please sign in. If you don't have an account, you must be invited by UTDesign Staff.</p>
        <div class="flex justify-center">
          <a href="/api/login/login">
            <button class="px-4 py-2 shadow-2xl rounded-lg text-lg custom-button" v-if="!isUser">
              Login
            </button>
          </a>
        </div>
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

    .custom-button {
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: #447a58;
    color: white
  }

  .custom-button:hover {
    background-color: #a5d5a7;
    color: black;
    font-weight: bolder
  }
</style>