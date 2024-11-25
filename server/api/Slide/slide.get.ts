import { PrismaClient } from "@prisma/client"
import { loginRedirectUrl } from "../login/auth0"

export default defineEventHandler(async event => {
    const { dashboardCuid , index }: { dashboardCuid: string, index: number} = await getQuery(event)
            //grab the dashboard given to us from the database, then we can map it to the given slide with our index passed in
            const dashboard = await event.context.client.dashboard.findUnique({
                where: { cuid: dashboardCuid as string },
                include: {
                    slides: true
                }
            })
            const queryRes = await event.context.client.slide.findUnique({
                where: { 
                    dashboardCuid: dashboard.cuid as string,
                    index: index as number
                },
                include: {
                    dashboard: true
                }
            });
            return queryRes;
        })