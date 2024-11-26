import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async event => {
    const { slideData, newURL, type, duration } : { slideData: any, newURL: any, type: string, duration: number } = await readBody(event)
    if (type === "image") {
        const result = await event.context.client.slide.update({ 
            where: { cuid: slideData.cuid },
            data: { image: newURL, duration: duration }
    });
        return result;
    }
    else if (type === "video") {
        const result = await event.context.client.slide.update({
            where: { cuid: slideData.cuid},
            data: { video: newURL, duration: duration }
        })
        return result;
    }
    else if (type === "website") {
        const result = await event.context.client.slide.update({
            where: { cuid: slideData.cuid},
            data: { website: newURL, duration: duration }
        })
        return result;
    }

});