import { PrismaClient } from "@prisma/client"
import {loginRedirectUrl} from "../login/auth0"

const runtime = useRuntimeConfig()

export default eventHandler(async event=> {
    const {cuid, name, dashboard, dashboardCuid } = await readBody(event)

try {
    const updateDevice = await event.context.client.device.update({
        where: { cuid: cuid },

        data: {
            dashboardCuid: dashboardCuid,
            dashboard: dashboard
        }
    })

    return true
}

catch (e) {
    console.error(e)
    return false;
}

})