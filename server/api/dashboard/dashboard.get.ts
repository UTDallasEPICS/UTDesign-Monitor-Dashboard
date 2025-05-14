import { PrismaClient } from "@prisma/client"
import {loginRedirectUrl} from "../login/auth0"

export default defineEventHandler(async event => { 
    const { cuid }: {cuid: string} = await getQuery(event) 

    const queryRes = await event.context.client.dashboard.findUnique({
        where: { cuid: cuid as string},
      include: {
        Owner: true // this is the many to one relationship Dashboards have with Users (owner)
    }
  });
    return queryRes;
})