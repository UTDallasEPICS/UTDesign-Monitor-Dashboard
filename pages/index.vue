<script setup lang="ts">
import type { User } from '@/types.d.ts'
import { computed } from 'vue'

const mduser = useCookie<User>('mduser');
const isUser = computed(() => (mduser.value?.user_role == 'admin' || mduser.value?.user_role == 'user')) // the same idea as "isLoggedIn"



</script>
<template lang="pug">
div.bg-purple-200.min-h-screen.w-screen.flex(class="flex flex-col space-y-4")
  MDHeader
  div.bg-white.border-4.border-gray-300.rounded-xl.w-full.max-w-2xl.p-16.shadow-2xl.flex
    label(for="image-url" class="block text-lg font-semibold mb-2" v-if="isUser") Welcome back!
</template>