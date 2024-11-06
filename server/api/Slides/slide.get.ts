


import { PrismaClient } from "@prisma/client"
import { loginRedirectUrl } from "../login/auth0"

export default defineEventHandler(async event => {
            //get
            const slides = await event.context.client.device.findUnique ({
                select: {
                    index: true,
                    name: true,
                    cuid: true,
                    dashboard: true,
                    dashboardCuid: true,
                    image: true,
                    video: true,
                    website: true
                }

            });
            return slides;


})