import { PrismaClient } from "@prisma/client"


export default defineEventHandler(async event =>  {
    if (event.context.user.user_role === 'admin') {
    const queryRes = await event.context.client.user.findMany({
        include: {
            dashboards: true
        }
    })
    return queryRes
    }
})