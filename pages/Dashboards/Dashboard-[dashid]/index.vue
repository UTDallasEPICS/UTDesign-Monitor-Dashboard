<!-- Dashboard order number -->

<template>
    <div>
        <h1>Dashboard {{ dashid }}</h1>
    </div>
</template>

<script setup>
    const dashid = useRoute().fullPath.split('-')[1];
</script>

<style scoped>

</style>