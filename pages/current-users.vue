<script setup lang= "ts">
import { reactive, ref } from 'vue'
import type { User } from '@/types.d.ts'




//array of current users
const users = reactive([]) 
const getUsers = async () => {
    //fetch
    const res = await $fetch("/api/User/users")
    for(let i = 0; i < res.length; i++){
        users.push({
        cuid: res[i]?.cuid,
        name: res[i]?.name,
        email: res[i]?.email,
        role: res[i]?.user_role,
        selected: false // Add a 'selected' property to track deletion
    });
  }
} 


//add user
const addUser = async () => {
    const newIndex = users.length + 1
    const newUser = {
        name: "",
        email: "example@example.com",
        role: "user",
        selected: false
    }

    users.push(newUser)

//creates user in database 

    const saveUser = await $fetch("/api/User/user", {
        method: 'POST',
        body: 
         {email: newUser.email}

    })
}

// role drop down 
const roleOption = ref([
    {text: 'Admin', value: 'admin'},
    {text: 'User', value: 'user'}
])

const UpdateUsers = async () => {
    for (let i = 0; i < users.length; i++) {
        const updatedUser = await $fetch("/api/User/user", {
            method: 'PUT',
            body: {
                cuid: users[i].cuid,
                name: users[i].name,
                email: users[i].email,
                user_role: users[i].user_role
            }
        })
    console.log(updatedUser)
    }   
  } 



// Pranav's code from Function to delete selected dashboards with confirmation---> delete selected users with confirmation
const deleteSelectedUser = async () => {
  const selectedUsers = users.filter(user => user.selected)
  const selectedCount = users.filter(user => user.selected).length

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
        body: ({ email: selectedUsers[i].email })
    })
    users.splice(0, users.length, ...users.filter(user => !user.selected))
//why this works? This is equivalent to saying users = users.filter(user => !user.selected). Not sure why GPT suggested this roundabout way. We can keep it for now, but it will likely be changed soon.
    } 
       
    }
  }


//calling function
getUsers();

</script>

<template lang="pug">
MDBody
    MDHeader
    div.p-10.bg-white.border.rounded-md.w-full.justify-center.items-center.flex.flex-col.space-y-4
        div.flex.items-center.gap-1.mb-1.px-5.py-2
            button.bg-green-200.hover_bg-green-300.h-10.rounded.w-24(@click="addUser") Add User 
            button.bg-red-200.hover_bg-red-300.h-10.rounded.w-24(@click="deleteSelectedUser") Delete Users
            button.bg-blue-200.hover_bg-blue-300.h-10.rounded.w-24(@click="UpdateUsers") Save
        div.w-full.overflow-y-auto.rounded-md.h-full()
            table.bg-cyan-200.w-full.text-left.column-gap.table-auto()
                thead.bg-fuchsia-200.w-full()
                    tr
                        th(class = "p-4 border-b")
                            p(class = "text-2xl.font-semibold") Name 
                        th(class ="p-4 border-b")
                            p(class ="text-2xl.font-semibold") Email 
                        th(class ="p-4 border-b")
                            p(class ="text-2xl.font-semibold") Role  
                        th(class = "p-4 border-b")
                tbody
                    tr(v-for= "(user, index) in users" :key= "index")
                        td.p-4
                            input.bg-inherit.w-full(v-model="user.name" placeholder = "name") 
                        td.p-4
                            input.bg-inherit.w-full(v-model="user.email" placeholder = "example@gmail.com") 
                        td.p-4
                            // This selection isn't actually updating anything inside of the user.role, meaning the frontend can't make the database update any user roles
                            // TODO: Fix this
                            select(v-model = "user.role")
                                option(v-for= "option in roleOption" :value="option.value" ) {{ option.text }}
                            div.selected
                        td(class = "p-4")
                            input.bg-inherit(type="checkbox" v-model="user.selected")
                            span Delete
</template>


 