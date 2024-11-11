import { PrismaClient } from "@prisma/client"
import { loginRedirectUrl } from "../login/auth0"


const runtime = useRuntimeConfig()


export default defineEventHandler(async event => {
    const body = await readBody(event);

    try{

        const queryRes1 = await event.context.client.dashboard.delete({
            where: {cuid: body.dashboardCuid }
        })

        const queryRes2 =  await event.context.client.device.delete({
            where: { cuid: body.cuid as string }
        })

        return true
    }


    catch (e) {
        console.error(e)
        return false;
    }
})


