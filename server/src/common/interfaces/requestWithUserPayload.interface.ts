import { Request } from 'express'
import { User } from '@prisma/client'

export interface RequestWithUserPayload extends Request {
    user?: User
}
