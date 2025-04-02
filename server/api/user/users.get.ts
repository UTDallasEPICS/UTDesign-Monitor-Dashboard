import { PrismaClient } from "@prisma/client"


export default defineEventHandler(async event =>  {
   
    const queryRes = await event.context.client.user.findMany({
        include: {
            dashboards: true
        }
    })
    return queryRes
})