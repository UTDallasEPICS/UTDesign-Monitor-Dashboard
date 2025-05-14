import { PrismaClient } from "@prisma/client"


export default defineEventHandler(async event =>  {
    const queryRes = await event.context.client.dashboard.findMany({
        include: {
            Owner: true,
            slides: true
        }
    })
    return queryRes
})