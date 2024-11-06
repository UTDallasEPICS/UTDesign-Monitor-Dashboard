import { PrismaClient } from "@prisma/client"
import { loginRedirectUrl } from "../../login/auth0"
const prisma = new PrismaClient()

/**
 * Get all details of existing devices from database
 */

interface DevicesAttributes {
    name: string;
    cuid: number;
    dashboard: URL,
    dashboardCuid: number;
}

export default defineEventHandler(async event => {
    // check authentication
     if (event.context.user?.user_role == "user" || event.context?.user_role == "admin") {
        
        //get
            const devices = await event.context.client.device.findMany ({
                select: {
                    name: true,
                    cuid: true,
                    dashboard: true,
                    dashboardCuid: true
                }
        
            });

            return devices;
            
        
     }
     return false;
});
