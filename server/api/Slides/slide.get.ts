import { Dashboard, PrismaClient } from "@prisma/client"
import { loginRedirectUrl } from "../login/auth0"
const prisma = new PrismaClient();

export default defineEventHandler(async event => {
    const { dashboard } = getQuery(event)
            //get
            const queryRes = await event.context.client.Slide.findMany ({
                where: {cuid: dashboard as string},
                include: {
                    dashboard: true,
                }
            });
            return queryRes;
        })