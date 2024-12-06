<script setup lang= "ts">
import { reactive, ref } from 'vue'

// role drop down 
const roleOption = ref([
    {text: 'Admin', value: 'admin'},
    {text: 'User', value: 'user'}
])

//add user name

//add user email

//array of current users
const users = ref([]) //?????

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
//???
const addUser = async () => {
    const newIndex = users.value.length + 1
    users.value.push({
        name: "",
        email: "",
        role: "",
        selected: false
    })


//save user
const saveSuccess = await $fetch("/api/User/user", {
    method: 'POST',
    body: ({ name: "",
        email: "",
        role: "" })

})

const updateUserRole = await $fetch("/api/User/user", {
    method: 'PUT',
    body: ({ name: "",
        email: "",
        role: "" })
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

    
        div.w-full.max-w-screen.max-h-96.overflow-y-auto.rounded-md.h-full
            table(class = "bg-blue-200 w-full text-left column-gap table-auto")
                thead(class = "bg-red-200")
                    tr
                        th(class = "p-4 border-b")
                            p(class = "text-2xl.font-semibold") Name {{ users_name }}
                        th(class ="p-4 border-b")
                            p(class ="text-2xl.font-semibold") Email {{ users_email }}
                        th(class ="p-4 border-b")
                            p(class ="text-2xl.font-semibold") Role  {{ users_user_role }}
                        th(class = "p-4 border-b")


                                    
                tbody
                    tr(v-for= "(user, index) in users" :key= "index")
                        td(class = "p-4") 
                            input(v-model = "user.name" placeholder = "name" class = "bg-blue-200")
                        td(class = "p-4") 
                            input(v-model = "user.email" placeholder = "example@gmail.com" class = "bg-blue-200")
                        td(class = "p-4") 
                            select(v-model = "user.role" class = "bg-blue-200")
                                option(v-for= "option in roleOption" :value="option.value" class = "bg-blue-200") {{ option.text }}
                            div.selected
                        td(class = "p-4")
                            input(type="checkbox" v-model="user.selected")
                            span Delete
</template>

//save user data in database doesn't work and vice versa
//need reactive api so that v-model doesn't ignore initial values and selected
//email replaces all fields??????
 