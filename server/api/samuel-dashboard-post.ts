import { PrismaClient } from "@prisma/client"
import {loginRedirectUrl} from "../api/auth0"


const runtime = useRuntimeConfig()

export default defineEventHandler(async event => {
    const body = await readBody(event);
    if (event.context.user?.user_role === "admin") {
        
    }
})