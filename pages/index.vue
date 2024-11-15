<script setup lang="ts">
import type { User } from '@/types.d.ts'
import { computed, ref } from 'vue'


const mduser = useCookie<User>('mduser');
const isUser = computed(() => (mduser.value?.user_role == 'admin' || mduser.value?.user_role == 'user')) // the same idea as "isLoggedIn"
const username = ref(mduser.value?.name)
const email = ref(mduser.value?.email)
const role = ref(mduser.value?.user_role)



</script>
<template lang="pug">
div.bg-purple-200.min-h-screen.w-screen.flex(class="flex flex-col space-y-4")
  MDHeader
  div.bg-purple-200.p-10.bg-white.border.rounded-md.justify-center.items-center(class="flex flex-col space-y-4")
    label(class="block text-lg font-semibold mb-2" v-if="isUser") Welcome back, {{ username }}!
    label(class="block text-lg font-semibold mb-2" v-if="!isUser") Please sign in. If you don't have an account, you must be invited by Tim Givens.
    label(class="font-semibold" v-if="isUser") Your role is: {{ role }}
    label(class="front-semibold" v-if="isUser") Your email is: {{ email }}

</template>