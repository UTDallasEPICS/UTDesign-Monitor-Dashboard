import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async event => {
    const { slideData, newURL, duration, newtype } : { slideData: any, newURL: any, newtype: string, duration: string } = await readBody(event)
    const durationAsInt = parseInt(duration, 10)
    const prevSlide = await event.context.client.slide.findUnique({
        where: { cuid: slideData.cuid },
        include: {
            dashboard: true
        }
    })
    const result = await event.context.client.slide.update({ 
        where: { cuid: slideData.cuid },
        data: { url: newURL || prevSlide.url, duration: durationAsInt || prevSlide.duration, type: newtype || prevSlide.type },
    })
    return result;
});