import { PrismaClient } from "@prisma/client"
import {loginRedirectUrl} from "./auth0"

export default defineEventHandler(async event => { 
    const { cuid } = getQuery(event) // todo: figure out exactly why this works; is it looking up the cuid?

    const queryRes = await event.context.client.dashboard.findFirst({
        where: { cuid: cuid as string },
      include: {
        owner: true // this is the many to one relationship Dashboards have with Users (owner)
    }
  });
    return queryRes;
})