import { PrismaClient } from "@prisma/client"
import { loginRedirectUrl } from "./auth0"

/*	/EditUser/0
*	  function:	POST
*	  submit user account details to database
*/
const runtime = useRuntimeConfig()

export default defineEventHandler(async event => { 
    const body = await readBody(event)
        try{
            const queryRes = await event.context.client.user.create({
                data: {
                    ...body, cuid: undefined
                }
            })
            return queryRes
        }
        catch (e) {
            console.log(e)
            return false
        }
})
