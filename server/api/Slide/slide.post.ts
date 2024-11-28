import { PrismaClient } from "@prisma/client"
import {loginRedirectUrl} from "../login/auth0"

const runtime = useRuntimeConfig()

export default eventHandler(async event=> {
    const body = await readBody(event)
    try {
    const dashboard = await event.context.client.dashboard.findFirst({
        where: { cuid: body.dashboardCuid as string }
    })
    
    const slides = await event.context.client.slide.findMany({
        where: { dashboardCuid: dashboard.cuid as string} 
    })
    const newIndex = slides.length + 1 || 0

    const queryRes = await event.context.client.slide.create({
        data: {
            index : newIndex,
            dashboardCuid: dashboard.cuid,
    }

})
    console.log(queryRes)
    return queryRes
}
catch (e) {
    console.error(e)
    return false;
}

})
