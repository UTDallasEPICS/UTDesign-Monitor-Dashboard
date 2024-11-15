<script setup lang="ts">
import type { User } from '@/types.d.ts'
import { computed } from 'vue'

const mduser = useCookie<User>('mduser');
const isUser = computed(() => (mduser.value?.user_role == 'admin' || mduser.value?.user_role == 'user')) // the same idea as "isLoggedIn"



</script>
<template lang="pug">
div.bg-purple-200.min-h-screen.w-screen.flex(class="flex flex-col space-y-4")
  MDHeader
  div.bg-purple-200.p-10.bg-white.border.rounded-md.justify-center.items-center(class="flex flex-col space-y-4")
    label(class="block text-lg font-semibold mb-2" v-if="isUser") Welcome back!
    label(class="block text-lg font-semibold mb-2" v-if="!isUser") Please sign in. If you don't have an account, you must be invited by Tim Givens.
    label() You are: {{ mduser.value?.name }}
    label() Your role is: {{ mduser.value?.user_role }}
    label() Your email is: {{ mduser.value?.email }}

</template>