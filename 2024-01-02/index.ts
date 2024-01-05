import { Request, Response } from 'express';

interface Server{
    start: () => Promise<void>,
    getRoutes: ( parentRoute: Route) => Route[]
    getUpTime: () => number,
}


interface Route{
    path: string,
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    handler: (req: Request, res: Response) => Promise<void | Response>
}

const signinRoute: Route = {
    path: '/signin',
    method: 'post',
    handler: async (req, res) => {
        
        return res.json();
    }
}