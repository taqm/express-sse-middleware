import { Request, Response, NextFunction } from 'express'; // eslint-disable-line import/no-unresolved

export { default as builder } from './EventBuilder';

declare global {
  export namespace Express {
    export interface Response {
      sse<E = string | object>(param?: SseParam): SseProvider<E>;
    }
  }
}

export interface EventData<E> {
  id?: string | null;
  event?: string | null;
  data: E | null;
}

class SseProvider<E> {
  constructor(readonly res: Response) {
    this.send = this.send.bind(this);
    this.keepAlive = this.keepAlive.bind(this);
    this.close = this.close.bind(this);
  }

  send<E1 = E>(data: EventData<E1> | string) {
    if (typeof (data) === 'string') {
      this.res.write(`data: ${data}\n\n`);
      return;
    }

    if (data.id) this.res.write(`id: ${data.id}\n`);
    if (data.event) this.res.write(`event: ${data.event}\n`);

    let text: string;
    if (typeof (data.data) === 'string') {
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

const handler = (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  res.sse = (param = {}) => {
    res.writeHead(
      param.statusCode || 200,
      {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        ...param.headers,
      },
    );
    res.write('\n');

    return new SseProvider(res);
  };
  next();
};

export default handler;
