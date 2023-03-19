import {expressjwt, Request, UnauthorizedError} from "express-jwt";
import express, {NextFunction, Response} from "express";

const jwt = {
    jwt: () => {
        return expressjwt({
            secret: <string>process.env.JWT_SECRET,
            algorithms: ["HS256"]
        })
    },
    jwtErrorHandler: (err: UnauthorizedError, req: Request, res: Response, next: NextFunction) => {
        if (err) {
            res.status(401).json({error: "Unauthorized"})
        } else {
            next(err)
        }
    }
}

export { jwt }
