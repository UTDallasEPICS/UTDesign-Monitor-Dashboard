import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async event => {
    const runtime = useRuntimeConfig()
    const body = await readBody(event)
    const replaced_image_cuid = body.replacedImage.cuid
    if(body.imageUploaded.url != body.replacedImage.url && body.replacedImage.url !== ""){
    try {
	const queryRes = await event.context.client.family.create({
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
    }
    return false
   
})

