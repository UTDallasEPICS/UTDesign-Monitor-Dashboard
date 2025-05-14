import { PrismaClient } from "@prisma/client"
import { loginRedirectUrl } from "../login/auth0"

export default defineEventHandler(async event => {
    const { slideCuid, dashboardCuid, index} : { slideCuid: any, dashboardCuid: any, index: any } = await readBody(event)
    const queryRes = await event.context.client.slide.delete({
        where: {
            cuid: slideCuid as string
        }
    });
    const res = await event.context.client.slide.updateMany({
        where: {
            dashboardCuid: dashboardCuid as string,
            index: {gt: index}
            },
        data: {index: {decrement: 1}}
    })
    
        return queryRes; 
    });