<template>
  <div class="m-4">
    <NavigationMenuRoot>
      <div>
        <NavigationMenuList
          class="p-4 shadow-lg bg-gradient-to-b from-orange-50 to-white rounded-lg border-2 border-green-700 flex list-none w-full justify-between items-center"
        >
          <div class="flex">
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
                <Icon v-if="item.icon" :icon="item.icon" class="mr-2" />
                {{ item.title }}
              </router-link>
            </NavigationMenuItem>

            <NavigationMenuItem class="nav-item">
              <button
                class="nav-link"
                @click="logout"
              >
                <Icon icon="line-md:log-out" class="mr-2" />
                Logout
              </button>
            </NavigationMenuItem>


            <NavigationMenuItem v-if="isAdmin" class="nav-item">
              <router-link
                to="/current-users"
                class="nav-link"
                active-class="router-link-exact-active"
              >
                <Icon icon="clarity:administrator-solid" class="mr-2 text-xl" />
                Admin
              </router-link>
            </NavigationMenuItem>
          </div>

          <div class="flex">
            <NavigationMenuItem class="nav-item">
              <router-link
                to="/profile"
                class="nav-link"
                active-class="router-link-exact-active"
              >
                {{ userNameRole }}
              </router-link>
            </NavigationMenuItem>
          </div>
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
import { Icon } from '@iconify/vue'
import type { User } from '@/types.d.ts'

const mduser = useCookie<User>('mduser');
const isAdmin = mduser.value.user_role === 'admin';
const userNameRole = mduser.value.name + ` (${mduser.value.user_role})`;
const router = useRouter();

const navItems = [
  { title: 'Dashboards', href: '/dashboardlist', icon: 'line-md:folder-multiple' },
  { title: 'My Profile', href: '/profile', icon: 'line-md:account' },
]

const route = useRoute()
const currentPageTitle = computed(() => {
  const path = route.path;
  if (path.includes('/dashboardlist')) {
    return 'Dashboards';
  } else if (path.includes('/dashboard')) {
    return 'Dashboard';
  } else if (path.includes('/edit-dashboard')) {
    return 'Edit';
  } else if (path.includes('/profile')) {
    return 'My Profile';
  } else if (path.includes('/current-users')) {
    return 'Admin';
  } else {
    return 'Unknown Page';
  }
});

const logout = async () => {
  window.location.href = ('/api/login/logout');
  router.push('/');
}
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
  text-decoration: underline green;
  text-decoration-thickness: 2px;
}

.text-stroke {
  -webkit-text-stroke: 0.5px black;
}

.user-name-role {
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.cursor-pointer {
  pointer-events: all !important;
  z-index: 9999;
}
</style>
