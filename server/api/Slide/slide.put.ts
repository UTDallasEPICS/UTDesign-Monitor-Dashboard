import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async event => {
    const { slideData, newURL, duration } : { slideData: any, newURL: any, type: string, duration: number } = await readBody(event)
    console.log(slideData)
    console.log(duration)
        const result = await event.context.client.slide.update({ 
            where: { cuid: slideData.cuid },
            data: { image: newURL, video: newURL, website: newURL, duration: duration }
        })
        return result;
});