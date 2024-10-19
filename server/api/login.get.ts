

export default defineEventHandler((event) => {
    const auth0Url = `https://${process.env.AUTH0_DOMAIN}/authorize?response_type=code&client_id=${process.env.AUTH0_CLIENT_ID}&redirect_uri=${process.env.AUTH0_CALLBACK_URL}&scope=openid profile email`
    return sendRedirect(event, auth0Url)
  })
  