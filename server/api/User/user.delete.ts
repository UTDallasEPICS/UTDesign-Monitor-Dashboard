import { PrismaClient } from "@prisma/client"
import { loginRedirectUrl, logoutRedirectUrl } from "./auth0"

export default defineEventHandler(async event => {
    const body = await readBody(event);
    console.log(body)
    if(event.context.user?.user_role === "admin") { // only admins can delete users!!
        const queryRes = await event.context.client.user.delete({
          where: {
              email: body.email as string
            }
            }
        );
    
        return queryRes; 
      }  else {
        return await sendRedirect(event, "/"); // go back to root directory
      } 
})