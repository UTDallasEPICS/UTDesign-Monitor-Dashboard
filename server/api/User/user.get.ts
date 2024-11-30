import { PrismaClient } from "@prisma/client"


export default defineEventHandler(async event =>  {
    const query = getQuery(event)
    if (event.context.user.user_role === 'admin') {
    const queryRes = await event.context.client.user.findUnique({
        where: { cuid: query.cuid }
    })
    return queryRes
    }
})