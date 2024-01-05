import { Request, Response } from "express"

export enum Method{
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete',
}

export interface Route{
    path: string,
    method: Method,
    handler: (req: Request, res: Response) => Promise<void | Response>
}