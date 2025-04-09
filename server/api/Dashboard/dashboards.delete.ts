import { PrismaClient } from "@prisma/client"
import { loginRedirectUrl } from "../login/auth0"


const runtime = useRuntimeConfig()


export default defineEventHandler(async event => {
    const body = await readBody(event);
    try{
        const owner = await event.context.client.user.findUnique({
            where: { 
                cuid: event.context.user.cuid,
                dashboards: {
                    some: {
                        cuid: body.cuid
                    } }
            }
        })
        if (event.context.user.user_role === "admin" || event.context.user.cuid === owner.cuid) {
            const deleteSlides = await event.context.client.slide.deleteMany({ // delete slides first
                where: { dashboardCuid: {in: body.cuids as string }}
            })
            const queryRes =  await event.context.client.dashboard.deleteMany({
                where: { cuid: {in: body.cuids as string}}
            })
        return queryRes
        }
        else {
            console.log("You can't delete this!")
            return false;
        }
    }
    catch (e) {
        console.error(e)
        return false;
    }
})

