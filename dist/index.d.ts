import { Request, Response, NextFunction } from 'express';
declare global {
    namespace Express {
        interface Response {
            sse(param?: SseParam): Writer;
        }
    }
}
declare type EventData = string | {
    id?: string;
    event?: string;
    data?: string;
    keep?: boolean;
};
interface Writer {
    (data: EventData): void;
}
interface SseParam {
    statusCode?: number;
    headers?: object;
}
declare const handler: (req: Request, res: Response, next: NextFunction) => void;
export default handler;
