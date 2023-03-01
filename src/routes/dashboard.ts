import router, {Request, Response, Router} from "express"

router().get('/', (req:Request, res:Response) => {
    res.send(req.query);
});

