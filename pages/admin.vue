<script setup lang="ts">


</script>

<template lang="pug">
MDBody
    MDHeader
    div.p-10.bg-white.border.rounded-md.w-full.max-w-3xl
        div.flex.items-center.justify-between.mb-6
            h2.text-xl.font-semibold.ml-auto My Admin Page
        div.flex.justify-center
            div.inline-grid.grid-cols-12.gap-4
                button.bg-purple-200.col-start-4.col-end-6.px-1.py-2.h-10.rounded.w-40.whitespace-nowrap
                        NuxtLink(to="/remove-dashboard") All Dashboards
                button.bg-red-200.col-start-7.col-end-9.px-4.py-2.rounded.w-32
                        NuxtLink(to="/current-users") Current Users 

    NuxtPage
</template>


//do i get rid of the white border bc it is in index
//div.bg-purple-200.p-10.bg-white.border.rounded-md.justify-center.items-center.flex.flex-col.space-y-4
//need to add hover
//add user - user gets sent email