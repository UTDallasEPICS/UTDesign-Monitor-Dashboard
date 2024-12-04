<script setup lang="ts">


</script>

<template lang="pug">
MDBody
    MDAdminHeader
    div.bg-purple-200.p-10.bg-white.border.rounded-md.w-full.max-w-3xl
        div.mx-auto.gap-12
            div.flex.justify-between.mb-4
                button.bg-gray-200.px-4.py-2.rounded
                        NuxtLink(to="/") Home
                h2.text-xl.font-semibold My Admin Page              
         
            div.flex.justify-between.items-center.mb-14

            div.inline-grid.grid-cols-12.gap-4
                button.bg-purple-200.col-start-1.col-end-2.px-1.py-2.h-10.rounded.w-40.whitespace-nowrap
                        NuxtLink(to="/remove-dashboard") Shared Dashboards
            
                button.bg-red-200.col-start-8.col-end-9.px-4.py-2.rounded.w-32
                        NuxtLink(to="/current-users") Current Users

                button.bg-red-200.col-start-11.col-end-12.px-4.py-2.rounded.w-32
                        NuxtLink(to="/new-user") Add User
</template>



