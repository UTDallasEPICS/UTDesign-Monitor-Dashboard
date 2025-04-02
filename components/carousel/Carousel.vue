<!-- Define a carousel component. -->

<template>
    <div class="carousel">
        <div class="carousel-inner">
            <CarouselIndicators :indicators="slides.length" :activeIndicator="currentSlide" @updateActiveSlide="setCurrentSlide" />
            <CarouselItem v-for="(slide, index) in slides" :slide="slide" :key="`item-${index}`" :current-slide="currentSlide" :index="index"/>
        </div>
    </div>
</template>

<script setup>
    import { useInterval } from '@vueuse/core'
    import { ref } from 'vue'

    const { slides } = defineProps(['slides']);
    const currentSlide = ref(0);
    const nextSlide = (count) => {
        currentSlide.value = (currentSlide.value + 1);
    }
    const setCurrentSlide = (index) => {
        currentSlide.value = index;
    }

    useInterval(3000, {callback: nextSlide})
</script>

<style scoped>
    .carousel {
        display: flex;
        justify-content: center;
    }

    .carousel-inner {
        position: relative;
        overflow: hidden;
        width: 400px;
        height: 250px;
    }
</style>