// import Express, { Request, Response, Application } from 'express';

// interface Server{
//     start: () => Promise<void>,
//     getRoutes: ( parentRoute: Route) => Route[]
//     getUpTime: () => number,
// }

// class ExpressServer implements Server{
//     private readonly app: Application;
//     private readonly port = process.env.PORT;

//     constructor(){
//         this.app = Express();
//     }

//     async start(){
//         this.app.listen(this.port, () => {
//             console.log('server is running on port: ', this.port);
//         });
//     }
// }

// interface Route{
//     path: string,
//     method: 'get' | 'post' | 'put' | 'patch' | 'delete',
//     handler: (req: Request, res: Response) => Promise<void | Response>
// }

// const signinRoute: Route = {
//     path: '/signin',
//     method: 'post',
//     handler: async (req, res) => {

//         return res.json();
//     }
// }

type Student = Record<string, number | string>;

const  getStudentInfo = <T> (student: Student, key: string):T => {
    return 1 as any;
}

const a = getStudentInfo({ age: 1, name: '홍길동' } as Student, 'student');