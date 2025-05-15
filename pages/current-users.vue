<template>
  <div class="p-10 w-full justify-center items-center flex flex-col space-y-4">
    <div class="flex items-center gap-1 mb-1 px-5 py-2">
      <button class="custom-button flex items-center justify-center" @click="addUser">
          <Icon icon="mingcute:add-fill" class="mr-2 text-xl" />
          Add User
      </button>
      <button class="custom-button flex items-center justify-center" @click="deleteSelectedUser">
          <Icon icon="tabler:trash" class="mr-2 text-xl" />
          Delete Users
      </button>
      <button class="custom-button flex items-center justify-center" @click="UpdateUsers">
          <Icon icon="line-md:confirm" class="mr-2 text-xl" />
          Save
      </button>
    </div>

    <div class="w-full overflow-y-auto h-full">
      <table class="w-full text-left table-auto border-collapse">
        <thead class="w-full">
          <tr class="border border-green-700">
            <th class="p-4">
              <p class="text-2xl font-semibold">Name</p>
            </th>
            <th class="p-4">
              <p class="text-2xl font-semibold">Email</p>
            </th>
            <th class="p-4">
              <p class="text-2xl font-semibold">Role</p>
            </th>
            <th class="p-4"></th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(user, index) in users"
            :key="index"
            class="bg-white border border-green-700"
          >
            <td class="p-2 border-t border-green-700">
              <input class="bg-inherit w-full" v-model="user.name" placeholder="name" />
            </td>
            <td class="p-2 border-t border-green-700">
              <input class="bg-inherit w-full" v-model="user.email" placeholder="example@gmail.com" />
            </td>
            <td class="p-2 border-t border-green-700 w-40">
              <select v-model="user.role" class="bg-inherit w-full text-center px-2 py-1 text-base border border-green-700 rounded-sm">
                <option v-for="option in roleOption" :value="option.value">{{ option.text }}</option>
              </select>
            </td>
            <td class="p-2 border-t border-green-700 text-center">
              <input type="checkbox" v-model="user.selected" />
              <span class="ml-1">Delete</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang= "ts">
import { reactive, ref } from 'vue'
import type { User } from '@/types.d.ts'
import { Icon } from '@iconify/vue'

const route = useRoute()
const router = useRouter()
const mduser = useCookie<User>('mduser');
const isAdmin = computed(() => (mduser.value?.user_role == 'admin'))

// If the admin changes their role to user, redirect to the main page
watch(isAdmin, (newVal, oldVal) => {
  // Only redirect if the role changed from admin to not-admin AND we're on the admin page
  if (!newVal && oldVal && route.path === '/current-users') {
    router.push('/dashboardlist');
    setTimeout(() => window.location.reload(), 100);
  }
})
//array of current users
const users = reactive([]) 
const getUsers = async () => {
    //fetch
    const res = await $fetch("/api/user/users")
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
    const savedUser = await $fetch("/api/user/user", {
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
            const updatedUser = await $fetch("/api/user/user", {
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
    const saveSuccess  = await $fetch('/api/user/user', { 
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

<style>
    .custom-button {
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: #447a58;
    color: white;
    border-radius: 5px;
    padding: 5px;
  }

  .custom-button:hover {
    background-color: #a5d5a7;
    color: black;
  }
</style>

 