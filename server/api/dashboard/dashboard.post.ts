import { PrismaClient } from "@prisma/client"
import {loginRedirectUrl} from "../login/auth0"
import dashboardDelete from "./dashboards.delete";


const runtime = useRuntimeConfig()

export default defineEventHandler(async event => {
    const body = await readBody(event);
    try {
        // vscode is complaining about client, but it should work because client is created in server/middleware/auth.ts
        const owner = await event.context.client.user.findFirst({
            where: { cuid: event.context.user?.cuid as string }
        })
        const queryRes = await event.context.client.dashboard.create({
            data: {
                name: body.name,
                userCuid: owner.cuid
            }
        }) 
        const newSlide = await event.context.client.slide.create({
            data: {
                dashboardCuid: queryRes.cuid,
                index: 1
            }
        })
        return true
    }
    catch (e) {
        console.error(e)
        return false;
    }
})
