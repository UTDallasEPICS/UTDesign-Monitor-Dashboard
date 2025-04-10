<template>
  <div class="m-4">
    <NavigationMenuRoot>
      <div>
        <NavigationMenuList class="p-4 shadow-lg bg-gradient-to-b from-orange-50 to-white rounded-lg border-2 border-green-700 flex list-none">
          <NavigationMenuItem
            v-for="(item, index) in navItems"
            :key="index"
            class="nav-item"
          >
            <router-link
              :to="item.href"
              class="nav-link"
              active-class="router-link-exact-active"
            >
              {{ item.title }}
            </router-link>
            <div class="absolute right-10 top-1/2 transform -translate-y-1/2">
            <router-link
              to="/profile"
              class="user-name-role"
            >
              {{ userNameRole }}
            </router-link>
        </div>
          </NavigationMenuItem>
        </NavigationMenuList>
        <main class="m-4 p-4 shadow-lg rounded-md border-2 border-green-700">
          <h1 class="text-3xl font-bold mb-4 text-green-700 text-stroke">{{ currentPageTitle }}</h1>
          <slot />
        </main>
      </div>
    </NavigationMenuRoot>
  </div>
</template>

<script setup lang="ts">
import { NavigationMenuItem, NavigationMenuRoot, NavigationMenuList } from 'reka-ui'
import type { User } from '@/types.d.ts'

const mduser = useCookie<User>('mduser');
const userNameRole = mduser.value.name + ` (${mduser.value.user_role})`;

const navItems = [
  { title: 'Dashboards', href: '/dashboardlist' },
  { title: 'My Profile', href: '/profile' },
  { title: 'Logout', href: '/api/login/logout' },
]

const route = useRoute()
const currentPageTitle = computed(() => {
  const currentNavItem = navItems.find(item => item.href === route.path)
  return currentNavItem ? currentNavItem.title : 'Page'
})
</script>

<style scoped>
.nav-item {
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.nav-link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: rgb(79, 112, 91);
}

.router-link-exact-active {
  font-weight: bolder;
  text-decoration: underline;
}

.text-stroke {
  -webkit-text-stroke: 0.5px black;
}

.user-name-role {
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.user-name-role:hover {
  color: rgb(79, 112, 91);
}
</style>
