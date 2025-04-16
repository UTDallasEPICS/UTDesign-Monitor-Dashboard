<template>
    <div class="grid grid-cols-4 gap-2">
        <div v-for="d in dashboards" :key="d.cuid">
            <DashboardPreviewCard :dashboard="d" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Dashboard } from '@/types.d.ts';

    const dashboards = await $fetch<Dashboard[]>("/api/Dashboard/dashboards");
</script>

<style scoped>

</style>