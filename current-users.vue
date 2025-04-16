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
    const newUser = {
        name: "",
        email: "",
        role: "user",
        selected: false
    };

    // Create the user in the database and get the response
    const savedUser = await $fetch("/api/User/user", {
        method: 'POST',
        body: { email: newUser.email }
    });

    // Assign the returned cuid to the new user object
    newUser.cuid = savedUser.cuid;

    // Push the new user to the users array
    users.push(newUser);
};

// role drop down 
const roleOption = ref([
    {text: 'Admin', value: 'admin'},
    {text: 'User', value: 'user'}
])

const saveStatus = ref(""); // Reactive variable to track save status
const errorMessage = ref(""); // Reactive variable to track error messages

const UpdateUsers = async () => {
    // Check for duplicate emails
    const emailSet = new Set();
    const duplicateEmails = users.filter(user => {
        if (emailSet.has(user.email)) {
            return true; // Duplicate found
        }
        emailSet.add(user.email);
        return false;
    });

    if (duplicateEmails.length > 0) {
        errorMessage.value = `Duplicate email(s) found: ${duplicateEmails.map(user => user.email).join(", ")}`;
        setTimeout(() => (errorMessage.value = ""), 5000); // Clear the error message after 5 seconds
        return; // Stop the save operation
    }

    try {
        saveStatus.value = "Saving..."; // Indicate that the save operation is in progress
        for (let i = 0; i < users.length; i++) {
            const updatedUser = await $fetch("/api/User/user", {
                method: 'PUT',
                body: {
                    cuid: users[i].cuid,
                    name: users[i].name,
                    email: users[i].email,
                    user_role: users[i].role
                }
            });
            console.log(updatedUser);
        }
        saveStatus.value = "Saved successfully!"; // Indicate success
        setTimeout(() => (saveStatus.value = ""), 3000); // Clear the status after 3 seconds
    } catch (error) {
        console.error("Error saving users:", error);
        saveStatus.value = "Failed to save. Please try again."; // Indicate failure
        setTimeout(() => (saveStatus.value = ""), 3000); // Clear the status after 3 seconds
    }
};

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
    div.p-10.bg-white.border.rounded-md.w-full.justify-center.items-center.flex.flex-col.space-y-4
        div.flex.items-center.gap-1.mb-1.px-5.py-2
            button.bg-green-200.hover_bg-green-300.h-10.rounded.w-24(@click="addUser") Add User 
            button.bg-red-200.hover_bg-red-300.h-10.rounded.w-24(@click="deleteSelectedUser") Delete Users
            button.bg-blue-200.hover_bg-blue-300.h-10.rounded.w-24(@click="UpdateUsers") Save
            span.text-sm.ml-2(v-if="saveStatus") {{ saveStatus }}
            span.text-sm.text-red-500.ml-2(v-if="errorMessage") {{ errorMessage }}
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
                            select(v-model = "user.role")
                                option(v-for= "option in roleOption" :value="option.value" ) {{ option.text }}
                            div.selected
                        td(class = "p-4")
                            input.bg-inherit(type="checkbox" v-model="user.selected")
                            span Delete
</template>