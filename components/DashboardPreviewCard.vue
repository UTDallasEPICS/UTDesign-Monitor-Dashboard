<template>
    <div class="card text-center shadow-md border border-secondary">
        <Carousel :slides="thumbnails"/>
        <h3 class="m-1">{{ dashboard.name }}</h3>
        <p class="m-1">{{ dashboard.owner.name }}</p>
        // button
    </div>
</template>

<script setup>
    import Carousel from '/components/carousel/Carousel.vue';

    const { dashboard } = defineProps(['dashboard']);
    const thumbnails = dashboard.slides.map( (slide) => slide.preview);
</script>

<style>
</style>