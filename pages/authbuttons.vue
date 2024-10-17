<template>
    <div>
      <button @click="$auth.loginWith('auth0')">Login with Auth0</button>
      <button v-if="$auth.loggedIn" @click="$auth.logout()">Logout</button>
      <p v-if="$auth.loggedIn">Hello, {{ $auth.user.name }}</p>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      isAuthenticated() {
        return this.$auth.loggedIn;
      },
      user() {
        return this.$auth.user;
      }
    }
  }
  </script>
  