<script setup lang= "ts">
import { onMounted, reactive, ref } from 'vue'
import type { User } from '@/types.d.ts'

// role drop down 
const roleOption = ref([
    {text: 'Admin', value: 'admin'},
    {text: 'User', value: 'user'}
])

//add user name

//add user email

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
      selected: false // Add a 'selected' property to track deletion
  });

}
}

//add user
const addUser = async () => {
    const newIndex = users.value.length + 1
    users.value.push({
        name: ``,
        email: ``,
        role: "",
        selected: false
    })


//save user
const saveSuccess = await $fetch("/api/User/user", {
    method: 'POST',
    body: ({ name: `User ${newIndex}`,
        email: `User ${newIndex}`,
        role: "" })

})

const updateUserRole = await $fetch("/api/User/user", {
    method: 'PUT',
    body: ({ name: `User ${newIndex}`,
        role: ""})
})

}


// Pranav's code from Function to delete selected dashboards with confirmation---> delete selected users with confirmation
const deleteSelectedUser = async () => {
  const selectedUsers = users.value.filter(user => user.selected)
  const selectedCount = users.value.filter(user => user.selected).length

  if (selectedCount === 0) {
    alert('No users selected for deletion.')
    return
  }

  // Confirm with the user before deletion
  const confirmed = window.confirm(`Are you sure you want to delete ${selectedCount} user(s), this is NOT reversible`)

  if (confirmed) {
    for (let i = 0; i < selectedCount; i++) {
    const saveSuccess  = await $fetch('/api/User/user', { 
        method: 'DELETE', 
        body: ({ name: selectedUsers[i].name })
    })
    users.value = users.value.filter(user => !user.selected)
    }
  }
}

//calling function
 getUsers();

</script>

<template lang="pug">
MDBody
    MDHeader
    div.margin-top.mt-40.w-full.px-96
        div.flex.items-center.gap-1.mb-1
                button.bg-white.h-10.rounded.w-24.whitespace-nowrap(@click="addUser") Add User
                button.bg-white.h-10.rounded.w-24.whitespace-nowrap(@click="deleteSelectedUser") Delete User

    
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
                            input(v-model = "name" placeholder = "name")
                        td(class = "p-4") {{ user.email }}
                            input(v-model = "name" placeholder = "example@gmail.com")
                        td(class = "p-4") 
                            select(v-model = "user.role" class = "")
                                option(v-for= "option in roleOption" :value="option.value") {{ option.text }}
                            div.selected
                                    

</template>