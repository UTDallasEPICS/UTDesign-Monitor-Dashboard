import { PrismaClient } from "@prisma/client"
import { loginRedirectUrl } from "./auth0"

/*	/EditUser/0
*	  function:	POST
*	  submit user account details to database
*/
const runtime = useRuntimeConfig()

export default defineEventHandler(async event => { 
    const body = await readBody(event)
    if (event.context.user.user_role === "admin") { // you can only create a user if you're an admin
        try{
            const queryRes = await event.context.client.user.create({
                data: {
                    user_role: body.user_role, cuid: undefined
                }
            })
            return queryRes
        }
        catch (e) {
            console.log(e)
            return false
        }
    }
    else {
        console.log("user attempted to create user")
        return false;
    }
})
