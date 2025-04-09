<template>
    <div>
        <h1>My Profile</h1>
    </div>
</template>

<script setup lang="ts">
    import type { User } from '@/types.d.ts'

    const mduser = useCookie<User>("mduser")
    const userName = mduser.value.name
    const userRole = mduser.value.user_role
    const userEmail = mduser.value.email
</script>

<style scoped>

</style>