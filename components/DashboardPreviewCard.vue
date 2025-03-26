<template>
    <div class="card text-center shadow-md border border-secondary">
        <Carousel :slides="thumbnails"/>
        <h3 class="m-1">{{ dashboard.title }}</h3>
        <p class="m-1">{{ dashboard.author.name }}</p>
        <UButton leading-icon="i-heroicons-magnifying-glass" :to="`/dashboards/dashboard-${dashboard.id}`" class="bg-green-700 shadow-lg">Details</UButton>
    </div>
</template>

<script setup>
    import { UButton } from '#components';
    import Carousel from './carousel/Carousel.vue';

    const { dashboard } = defineProps(['dashboard']);

    const thumbnails = dashboard.documents.map( (document) => document.preview);
</script>

<style>
</style>