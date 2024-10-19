import {loginRedirectUrl, logoutRedirectUrl} from "../api/auth0"
import jwt from "jsonwebtoken"
import fs from "fs"
import { PrismaClient } from "@prisma/client"
const client = new PrismaClient()

const runtime = useRuntimeConfig()

export default defineEventHandler(async event => {
    event.context.client = client
    const mdtoken = getCookie(event, "mdtoken") || ""
})
