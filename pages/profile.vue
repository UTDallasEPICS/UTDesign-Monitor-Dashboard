<template>
    <div>
      <div>
        <p class="text-xl"><strong>Name:</strong> {{ mduser?.name }}</p>
        <p class="text-xl"><strong>Email:</strong> {{ mduser?.email }}</p>
        <p class="text-xl"><strong>Role:</strong> {{ mduser?.user_role }}</p>
      </div>
    </div>
  </template>

<script setup lang='ts'>
    import type { User } from '@/types.d.ts'
    const mduser = useCookie<User>('mduser');
</script>

<style scoped>

</style>