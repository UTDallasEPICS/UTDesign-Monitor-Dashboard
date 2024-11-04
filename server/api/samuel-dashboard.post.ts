import { PrismaClient } from "@prisma/client"
import {loginRedirectUrl} from "./auth0"


const runtime = useRuntimeConfig()

export default defineEventHandler(async event => {
    const body = await readBody(event);
    
})