import { loginRedirectUrl, logoutRedirectUrl } from "../api/login/auth0"
import jwt from "jsonwebtoken"
import fs from "fs"
import { PrismaClient } from "@prisma/client"
const client = new PrismaClient()

const runtime = useRuntimeConfig()

export default defineEventHandler(async event => {
    event.context.client = client
    const mdtoken = getCookie(event, "mdtoken") || ""
    if (!mdtoken && !(event.node.req.url?.includes('/api/login/callback') || event.node.req.url?.includes("/"))) {
        await sendRedirect(event, loginRedirectUrl()); 
      } else {
        // theoretically logged in here
        if (mdtoken) {
          try {
            const claims = jwt.verify(
              mdtoken, 
              fs.readFileSync(process.cwd()+"/cert-dev.pem")
            )
            event.context.claims = claims 
            event.context.user = await event.context.client.user.findFirst( // the user of a given event is found here
              {
                where: { email: claims.email }
              })
              if(!event.context.user) {
                setCookie(event,'mdtoken','')
                setCookie(event,'mduser','')
                console.log("you're not in the database, get invited by tim givens")
                return await sendRedirect(event, logoutRedirectUrl(mdtoken)) // todo: add error message after failed log in attempt
              }
              setCookie(event, 'mduser', JSON.stringify(event.context.user))
            }
            catch (e) {
                console.error(e)
            }
        }
    }
    
})
