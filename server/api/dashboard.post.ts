import { PrismaClient } from "@prisma/client"
import type { Dashboard } from "@/types.d.ts"

// function: POST

export default defineEventHandler(async event => {
    const runtime = useRuntimeConfig()
    const body = await readBody(event)
    const replaced_image_cuid = body.replacedImage.cuid
	// TODO: The User that called this function should have their user object and user cuid entered into the Dashboard
    try {
	const queryRes = await event.context.create({
	    data: {
		name: name,
		owner: {
			connect: { cuid: event.context.user.cuid }
		    },
		cuid: undefined,
		
	    }
	}
	) 
	return queryRes
	}
    catch (e) {
      console.log(e)
    }
    return false
})

