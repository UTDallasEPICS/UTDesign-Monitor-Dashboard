<script setup lang="ts">


</script>

<template lang="pug">
    div.p-10.bg-white.border.rounded-md.w-full.max-w-3xl
        div.flex.items-center.justify-between.mb-6
            h2.text-xl.font-semibold.ml-auto My Admin Page
        div.flex.justify-center.items-center
            NuxtLink(to="/current-users")
                button.bg-red-200.px-4.py-2.rounded.w-32.hover_bg-red-300 Current Users
</template>


//do i get rid of the white border bc it is in index
//div.bg-purple-200.p-10.bg-white.border.rounded-md.justify-center.items-center.flex.flex-col.space-y-4
//need to add hover
//add user - user gets sent email