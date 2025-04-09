<!-- User layout for each page with navigation bar -->

<template>
    <div class="m-4">
        <UNavigationMenu :items="items" class="p-4 shadow-lg bg-gradient-to-b from-orange-50 to-white rounded-lg border-2 border-green-700">
            <template #default="{ item }: { item: NavigationMenuItem}">
                <span class="group-hover:text-green-700 relative">{{ item.label }}</span>
            </template>
        </UNavigationMenu>
        <main class="m-4 p-4 shadow-lg rounded-md border-2 border-green-700">
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { ref } from 'vue';
import { useRouter } from '#vue-router'
import type { User } from '@/types.d.ts'

const mduser = useCookie<User>("mduser")
const router = useRouter()

let userNameRole: string = mduser.value.name + ` (${mduser.value.user_role})`;


const logout = () => {  // Create a button that allows the user to logout
    mduser.value.cuid = "";
    router.push('/login');
};

const items = ref<NavigationMenuItem[]>([
    [
        {
            label: 'Dashboards',
            icon: 'i-heroicons-document-duplicate',
            to: '/dashboardlist',
        },
        {
            label: 'My Profile',
            icon: 'i-heroicons-user',
            to: '/profile',
        },
        // {
        //     label: 'Logout',
        //     icon: 'i-heroicons-lock-closed',
        //     action: logout,
        // },
    ],
    [
        {
            label: userNameRole,
            to: '/profile',
        },
    ],
])

</script>

<style scoped>
    .router-link-exact-active {font-weight: bolder;}
</style>