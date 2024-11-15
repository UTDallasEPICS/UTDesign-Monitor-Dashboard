<script setup lang="ts">


</script>

<template lang="pug">
div.bg-purple-200.min-h-screen.w-screen.flex.justify-center.items-center
    div.bg-purple-200.p-10.bg-white.border.rounded-md.w-full.max-w-3xl
        div.mx-auto.gap-12
            div.flex.justify-between.mb-4
                button.bg-gray-200.px-4.py-2.rounded
                        NuxtLink(to="/") Home
                h2.text-xl.font-semibold My Admin Page              
         
            div.flex.justify-between.items-center.mb-6
                div.inline-grid.grid-cols-12.gap-4
                    button.bg-red-200.col-start-8.col-end-9.bg-gray-200.px-4.py-2.rounded.w-32
                        NuxtLink(to="/current-users") Current Users

                    button.bg-red-200.col-start-11.col-end-12.bg-gray-200.px-4.py-2.rounded.w-32
                        NuxtLink(to="/new-user") Add User

            div.mx-auto.gap-12
                button.bg-purple-200.px-2.py-2.rounded.text-sm.font-semibold
                    NuxtLink(to="/remove-dashboard") Shared Dashboards


    NuxtPage
</template>



