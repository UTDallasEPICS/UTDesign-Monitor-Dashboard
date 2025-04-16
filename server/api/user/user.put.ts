import { PrismaClient } from "@prisma/client"


export default defineEventHandler(async event => {
    // updates all users in the database
    const { cuid, name, email, user_role } : { cuid: string, name: string, email: string, user_role: string} = await readBody(event)
    if (event.context.user.user_role != "admin") { return false; } // only admins can update user info
    else {
        const result = await event.context.client.user.update({
            where: {
                cuid: cuid
            },
            data: { 
                name: name,
                email: email,
                user_role: user_role
             }
        })
        return result;
    }
});