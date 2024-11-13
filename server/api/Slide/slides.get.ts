import { Dashboard, PrismaClient } from "@prisma/client"
import { loginRedirectUrl } from "../login/auth0"

export default defineEventHandler(async event => {
    const { dashboardCuid }: { dashboardCuid: string } = await getQuery(event)
            //get
            const dashboard = await event.context.client.dashboard.findUnique({
                where: { cuid: dashboardCuid as string },
                include: {
                    slides: true
                }
            })
            const queryRes = await event.context.client.slide.findMany ({
                where: { dashboardCuid: dashboard.cuid as string },
                include: {
                    dashboard: true
                }
            });
            return queryRes;
        })