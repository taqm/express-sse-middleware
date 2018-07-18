import { Request, Response, NextFunction } from 'express';
export { builder } from './EventBuilder';

declare global {
  export namespace Express {
    export interface Response {
      sse(param?: SseParam): SseProvider;
    }
  }
}

export interface EventData {
  id?: string | null;
  event?: string | null;
  data: string | object;
}

class SseProvider {
  constructor(readonly res: Response) {
    this.send = this.send.bind(this);
    this.keepAlive = this.keepAlive.bind(this);
    this.close = this.close.bind(this);
  }

  send(data: EventData | string) {
    if (typeof(data) === 'string') {
      this.res.write(`data: ${data}\n\n`);
      return;
    }

    if (data.id)    this.res.write(`id: ${data.event}\n`);
    if (data.event) this.res.write(`event: ${data.event}\n`);
    let text: string;
    if (typeof(data.data) === 'string') {
      text = data.data;
    } else {
      text = JSON.stringify(data.data);
    }
    this.res.write(`data: ${text}\n\n`);
  }

  /**
   * write empty comment
   */
  keepAlive() {
    this.res.write(':\n\n');
  }

  close() {
    this.res.end();
  }
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

    return new SseProvider(res);
  };
  next();
};

export default handler;

