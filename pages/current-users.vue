<script setup lang= "ts">
import { onMounted, reactive, ref } from 'vue'

//array of current users
const users = ref([])

const getUsers = async () => {
    //fetch list of users 
    const res = await $fetch("/api/User/users")


for(let i = 0; i < res.length; i++){
      users.value.push({
      name: res[i].name,
      email: res[i].email,
      role: res[i].user_role,
      selected: false,  // Add a 'selected' property to track deletion
  });

}

}

//calling function
onMounted(() => {
    getUsers();

});
</script>

<template lang="pug">
div.bg-purple-200.min-h-screen.w-screen.items-center.flex.flex-col.space-y-4
    div.margin-top.mt-40.w-full.px-96
        div.w-full.max-w-screen.rounded-md.h-full.overflow-scroll
            table(class = "w-full text-left table-auto")
                thead(class = "bg-red-200")
                    tr
                        th(class = "p-4 border-b")
                            p(class = "text-2xl.font-semibold") Name {{ users_name }}
                        th(class ="p-4 border-b")
                            p(class ="text-2xl.font-semibold") Email {{ users_email }}
                        th(class ="p-4 border-b")
                            p(class ="text-2xl.font-semibold") Role  {{ users_user_role }}
                tbody
                    tr(v-for= "(user, index) in users" :key= "index")
                        td(class = "p-4") {{ user.name }}
                        td(class = "p-4") {{ user.email }}
                        td(class = "p-4") {{ user.role }}

</template>