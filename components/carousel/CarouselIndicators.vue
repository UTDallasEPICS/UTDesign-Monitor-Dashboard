<!-- Rendering carousel indicators (dots) for navigating through slides. -->

<template>
    <div class="carousel-indicators">
        <button class="carousel-indicator-item" v-for="(item, index) in indicators" :key="index" :class="{active: activeIndicator === index}"/>
    </div>
</template>

<script setup>
    const { indicators, activeIndicator } = defineProps(['indicators', 'activeIndicator']);
    const emit = defineEmits(['updateActiveSlide']);

    function onClick(index) {
        emit('updateActiveSlide', index);
    }
</script>

<style scoped>
    .carousel-indicators {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 1.5em;
        z-index: 2;
    }

    .carousel-indicator-item {
        width: 15px;
        height: 15px;
        margin: 0.2em;
        background-color: #fff;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0.5;
    }

    .active {
        opacity: 1;
    }
</style>