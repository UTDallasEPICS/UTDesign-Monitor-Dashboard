import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async event => {
    const { slideData, newURL, duration, newtype } : { slideData: any, newURL: any, newtype: string, duration: string } = await readBody(event)
    const durationAsInt = parseInt(duration, 10)
        const result = await event.context.client.slide.update({ 
            where: { cuid: slideData.cuid },
            data: { image: newURL || '', video: newURL || '', website: newURL || '', duration: durationAsInt || 10, type: newtype || '' }
        })
        return result;
});