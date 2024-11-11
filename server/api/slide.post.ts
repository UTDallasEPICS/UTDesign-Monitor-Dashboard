import { PrismaClient } from "@prisma/client"
import { loginRedirectUrl } from "./auth0"

const runtime = useRuntimeConfig()

export default defineEventHandler(async event => { 
    const body = await readBody(event)
        try{
            const dash = await event.context.client.dashboard.findFirst({ // dashboard 
                where: { cuid: body.dashboard?.cuid as string }
            })
            const slides = await event.context.client.slide.findMany({
                where: { dashboardCuid: dash.cuid }
            })

            const queryRes = await event.context.client.slide.create({
                data: {
                    dashboard: dash, 
                    index: slides.length,
                    cuid: undefined
                }
            })
            return queryRes
        }
        catch (e) {
            console.log(e)
            return false
        }
})