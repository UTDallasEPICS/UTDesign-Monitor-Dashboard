<script setup lang="ts">
import type { User } from '@/types.d.ts'
import { computed, watchEffect } from 'vue'

definePageMeta({
  layout: "login"
});

const router = useRouter()
const mduser = useCookie<User>('mduser');
const isUser = computed(() => (mduser.value?.user_role == 'admin' || mduser.value?.user_role == 'user'))

watch(isUser, (newVal) => {
  if (newVal) {
    router.push('/dashboardlist')
  } else {
    router.push('/')
  }
}, { immediate: true })
</script>

<template>

</template>