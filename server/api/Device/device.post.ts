import { PrismaClient } from "@prisma/client"
import {loginRedirectUrl} from "../login/auth0"

const runtime = useRuntimeConfig()

export default eventHandler(async event=> {
    const body = await readBody(event)
    try {
    const dashboard = await event.context.client.dashboard.findFirst({
        where: { cuid: event.context.dashboard?.cuid as string}
    })

    const queryRes = await event.context.client.device.create({
        data: {
            dashboardCuid: dashboard.cuid
    }
})

    return true
}
catch (e) {
    console.error(e)
    return false;
}

})
