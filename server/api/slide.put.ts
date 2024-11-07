import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async event => {
    const body = readBody(event)
    const { slideData, newURL, type }: { slideData: any, newURL: any, type: string } = await readBody(event)
    if (type === "image") {
        const result = await event.context.client.slide.update({ 
            where: { cuid: slideData.cuid } ,
            data: { image: newURL }
    });
    return result;
    }
    else if (type === "video") {
        const result = await event.context.client.slide.update({
            where: { cuid: slideData.cuid} ,
            data: { video: newURL }
        })
        return result;
    }
    else if (type === "website") {
        const result = await event.context.client.slide.update({
            where: { cuid: slideData.cuid} ,
            data: { website: newURL }
        })
        return result;
    }

});