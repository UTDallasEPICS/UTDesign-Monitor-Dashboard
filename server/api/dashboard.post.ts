import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async event => {
    const body = await readBody(event)
   /* const replaced_image_cuid = body.replacedImage.cuid
    if(body.imageUploaded.url != body.replacedImage.url && body.replacedImage.url !== ""){
    try {
        // Replaces entry in the database in the image model for a specfic image
        await prisma.$transaction([
            prisma.image.delete({
            where: {
                cuid: body.imageUploaded.cuid
            }
        }), prisma.image.update({
            where: {
                cuid: replaced_image_cuid
            },
            data: {
                url:  body.imageUploaded.url,
        
                }
            }
        ) ]);

        return true;
    } catch (e) {
        console.error(e);
    }
    }
    return false
    */
})

