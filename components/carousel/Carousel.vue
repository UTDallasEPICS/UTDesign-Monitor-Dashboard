<template>
    <Carousel v-bind="config">
      <Slide v-for="(slide, index) in slides" :key="slide.index">
        <img :src="slide" alt="Preview" class="w-full h-full object-cover" />
      </Slide>
      
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
</template>

<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const { slides } = defineProps(['slides']);
const config = {
    height: 500,
    itemsToShow: 1,
    gap: 5,
    }   
</script>

<style scoped>

</style>