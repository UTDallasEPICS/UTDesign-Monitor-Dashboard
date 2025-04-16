import { PrismaClient } from "@prisma/client"
import { loginRedirectUrl } from "../login/auth0"

/**
 * Get all details of existing devices from database
 */

export default defineEventHandler(async event => {      
        //get
        const {cuid} = getQuery(event)
            const devices = await event.context.client.device.findMany ({
                include: { 
                    dashboard: true 
                }
            });
            
            return devices;
});
