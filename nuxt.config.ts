import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: ['@nuxt/axios', '@nuxtjs/auth-next'],

  auth: {
    strategies: {
      auth0: {
        domain: 'dev-iogq1tl6zdurzsq2.us.auth0.com',
        clientId: 'Hfh8GDZlysdv23q8GxOyDaSRJrYbIvto',
        logoutRedirectUri: 'http://localhost:3000'
      }
    }
  },

  axios: {
    baseURL: 'http://localhost:3000',
  },
  
  router: {
    middleware: ['auth']
  }
});
