// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
  modules:
  ['@nuxtjs/tailwindcss',],

  vite: {
    resolve: {
      dedupe:["vue"]
    },
  },
function ensureEnv(envName: string): string {
    if (!process || !process.env) {
	throw new Error(
	    'Attempted to get environment variable from client. This should not happen',
	)
    }
    const value = process.env[envName]
    if (process.env.DISABLE_ENV_CHECKING === 'true') return value!
    if (!value) {
    throw new Error(
	`Missing environment variable "${envName}." Please define it in .env, or use DISABLE_ENV_CHECKING="true"`,
    )
	}
    return value
    }
})
