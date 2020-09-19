import { Request, Response, NextFunction } from 'express'; // eslint-disable-line import/no-unresolved
import SseProvider from './SseProvider';

declare global {
  export namespace Express {
    export interface Response { // eslint-disable-line no-shadow
      sse(param?: SseParam): SseProvider; // eslint-disable-line no-use-before-define
    }
  }
}

type SseParam = {
  statusCode?: number;
  headers?: object;
};

const handler = (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  res.sse = (param: SseParam = {}) => {
    res.writeHead(
      param.statusCode ?? 200,
      {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        ...(param.headers ?? {}),
      },
    );
    res.write('\n');

    return new SseProvider(res);
  };
  next();
};

export default handler;
