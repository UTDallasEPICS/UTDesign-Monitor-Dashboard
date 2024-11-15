import { PrismaClient } from "@prisma/client"
import {loginRedirectUrl} from "../login/auth0"

const runtime = useRuntimeConfig() // do I need this? I forgot

export default eventHandler(async event=> {
    const { cuid, name } = await readBody(event)

try {
    const updateDashboard = await event.context.client.dashboard.update({
        where: { cuid: cuid },

        data: {
            name: name
        }
    })

    return true
}

catch (e) {
    console.error(e)
    return false;
}

})