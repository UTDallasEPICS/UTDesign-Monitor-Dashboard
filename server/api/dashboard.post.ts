import { PrismaClient } from "@prisma/client"
import type { Dashboard } from "@/types.d.ts"

const prisma = new PrismaClient()

// function: POST

export default defineEventHandler(async event => {
    const runtime = useRuntimeConfig()
    const body = await readBody(event)
    console.log(body);
	// TODO: The User that called this function should have their user object and user cuid entered into the Dashboard
	const queryRes = await event.context.prisma.dashboard.create({
	    data: {
		name: name, // todo: uncomment this
		/* owner: {
			connect: { cuid: event.context.user.cuid }
		    },*/
		// cuid: undefined
		
	    }
	}
	) 
	return queryRes
	})
 


