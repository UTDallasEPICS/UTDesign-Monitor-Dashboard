<template>
    <div>
        <h2>My Dashboards</h2>
        <div class="grid grid-cols-4 gap-2">
            <div v-for="d in dashboards" :key="d.id">
                <DashboardPreviewCard :dashboard="d" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Dashboard } from '~/types';

    const data = await $fetch("/api/dashboards.get.ts");
    const dashboards = data.map( (item: Dashboard) => item)
</script>

<style scoped>

</style>