import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UpdateMaxAgeMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // Update the max age for the session cookie on each request
        if (req.isAuthenticated()) {
            req.session.cookie.maxAge = 86400000; // set the max age in milliseconds (24 hours in this example)
        }
        next();
    }
}