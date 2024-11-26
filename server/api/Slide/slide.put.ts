import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async event => {
    const { slideData, newURL, duration } : { slideData: any, newURL: any, type: string, duration: string } = await readBody(event)
    console.log(slideData)
    console.log(duration)
    const durationAsInt = parseInt(duration, 10)
        const result = await event.context.client.slide.update({ 
            where: { cuid: slideData.cuid },
            data: { image: newURL, video: newURL, website: newURL, duration: durationAsInt }
        })
        return result;
});