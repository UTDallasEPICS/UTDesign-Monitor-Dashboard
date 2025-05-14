import { PrismaClient } from "@prisma/client"
import {loginRedirectUrl} from "../login/auth0"

const runtime = useRuntimeConfig()

export default eventHandler(async event=> {
    const {dashboardCuid, serialNumber, name } = await readBody(event)

try {
    const updateDevice = await event.context.client.device.update({
        where: { serialNumber: serialNumber },
        data: {
            dashboardCuid: dashboardCuid,
            name: name,
        }
    })

    return true
}

catch (e) {
    console.error(e)
    return false;
}

})