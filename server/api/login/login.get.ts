import { loginRedirectUrl } from "../login/auth0"

export default defineEventHandler((event) => {
    const config = useRuntimeConfig()
    const auth0Url = `https://${config.public.AUTH0_DOMAIN}/authorize?response_type=code&client_id=${config.public.AUTH0_CLIENT_ID}&redirect_uri=${config.public.AUTH0_CALLBACK_URL}&scope=openid`
    
    return sendRedirect(event, loginRedirectUrl() || "")
  })
  