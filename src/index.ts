import { Request, Response, NextFunction } from 'express';

declare global {
  export namespace Express {
    export interface Response {
      sse(param?: SseParam): Writer;
    }
  }
}

type EventData = string | {
  id?: string;
  event?: string;
  data?: string;
};

interface Writer {
  (data: EventData): void;
}

interface SseParam {
  statusCode?: number;
  headers?: object;
}

const handler = function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.sse = (param = {}) => {
    res.writeHead(
      param.statusCode || 200,
      Object.assign(
        {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
        param.headers,
      ),
    );
    res.write('\n');

    return (data: EventData = '') => {
      if (typeof(data) === 'string') {
        res.write(`data: ${data}\n\n`);
        return;
      }

      if (data.id)    res.write(`id: ${data.event}\n`);
      if (data.event) res.write(`event: ${data.event}\n`);
      res.write(`data: ${data.data}\n\n`);
    };
  };

  next();
};

export default handler;
