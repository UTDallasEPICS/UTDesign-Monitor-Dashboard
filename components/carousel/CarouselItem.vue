<!-- Display a slide with transition. -->

<template>
    <Transition name="carousel">
        <div class="carousel-item" v-show="currentSlide === index">
            <img :src="slide" />
        </div>
    </Transition>
</template>

<script setup>
    const { slide, currentSlide, index } = defineProps(['slide', 'current-slide', 'index']);
</script>

<style scoped>
    .carousel-item {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .carousel-enter-actve,
    .carousel-leave-active {
        transition: all 0.5s ease-in;
    }

    .carousel-enter-from {
        opacity: 0;
        transform: translateX(-100%);
    }   

    .carousel-leave-to {
        opacity: 0;
        transform: translateX(100%);
    }
</style>