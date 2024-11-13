import {nanoid} from "nanoid"

const state = {}; 
const genState = () => { const s = nanoid(); state[s] = 1;  return s}
const runtime = useRuntimeConfig()

export const loginRedirectUrl = () => `${runtime.ISSUER}authorize?response_type=id_token&response_mode=form_post&client_id=${runtime.public.AUTH0_CLIENT_ID}&scope=openid%20email&redirect_uri=${encodeURIComponent(runtime.BASEURL!+"api/login/callback")}&nonce=${genState()}`
export const logoutRedirectUrl = (id_token: string) => `${runtime.ISSUER}oidc/logout?id_token_hint=${id_token}&post_logout_redirect_uri=${encodeURIComponent(runtime.BASEURL!+"api/login/logout-complete")}&nonce=${genState()}`

export const verifyNonce = (nonce: string) => {
  if (state[nonce]) {
    delete state[nonce]
    return true
  }
  return false
}