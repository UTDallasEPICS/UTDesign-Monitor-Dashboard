import { PrismaClient } from "@prisma/client"
import type { Dashboard } from "@/types.d.ts"
import { getPrismaClient } from "@prisma/client/runtime/library";

const client = new PrismaClient()

// function: GET

export default defineEventHandler(async event => {
    const runtime = useRuntimeConfig()
    
    if(event.context.user.cuid != undefined) { //if the user is not logged in, don't fetch anything
        const { cuid } = getQuery(event);
		const role = event.context.user?.user_role || ""
		if( (cuid as string) == "0" || cuid == undefined){
			return false
		}
		const queryRes = await client.page.findFirst({
      where: {
			  cuid : cuid as string
		  },
		  include: {
        name: true,
        slides: true,
        owner: true,
	userCuid: true,
        Device: true
		  }
		});
	  return queryRes;
    }
})
    

