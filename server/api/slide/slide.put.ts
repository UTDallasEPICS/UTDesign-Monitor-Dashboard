import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async event => {
    const { slideData, newURL, duration, newtype } : { slideData: any, newURL: any, newtype: string, duration: any  } = await readBody(event)
    const saved = await event.context.client.slide.findUnique({
        where: { cuid: slideData.cuid }
    })
        const result = await event.context.client.slide.update({ 
            where: { cuid: slideData.cuid },
            data:   {   url: newURL || saved.url,
                        duration: duration || saved.duration,
                        type: newtype || saved.type
                    }
        })
        return result;
});