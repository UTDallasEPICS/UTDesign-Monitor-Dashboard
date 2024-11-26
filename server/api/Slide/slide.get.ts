import { PrismaClient } from "@prisma/client"
import { loginRedirectUrl } from "../login/auth0"

export default defineEventHandler(async event => {
    const { dashboardCuid , index }: { dashboardCuid: string, index: string} = await getQuery(event)
            const indexInt = parseInt(index, 10) // convert the string to int because Prisma is complaining about the number for some reason
            //grab the dashboard given to us from the database, then we can map it to the given slide with our index passed in
            const dashboard = await event.context.client.dashboard.findUnique({
                where: { cuid: dashboardCuid as string },
                include: {
                    slides: true
                }
            })
            const queryRes = await event.context.client.slide.findFirst({
                where: { 
                    dashboardCuid: dashboard.cuid as string,
                    index: indexInt,
                },
                include: {
                    dashboard: true
                }
            });
            return queryRes;
        })