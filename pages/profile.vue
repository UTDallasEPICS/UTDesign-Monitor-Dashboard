<template>
    <div>
      <div>
        <p><strong>Name:</strong> {{ mduser?.name }}</p>
        <p><strong>Email:</strong> {{ mduser?.email }}</p>
        <p><strong>Role:</strong> {{ mduser?.user_role }}</p>
      </div>
    </div>
  </template>

<script setup lang='ts'>
    import type { User } from '@/types.d.ts'
    const mduser = useCookie<User>('mduser');
</script>

<style scoped>

</style>