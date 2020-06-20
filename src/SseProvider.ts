import { Response as ExpressResponse } from 'express'; // eslint-disable-line import/no-unresolved
import { EventData } from './EventBuilder';

export type Response = Pick<ExpressResponse, 'write' | 'end'>;

export default class SseProvider {
  #res: Response;

  constructor(res: Response) {
    this.#res = res;
  }

  send = <E>(data: EventData<E> | string) => {
    if (typeof (data) === 'string') {
      this.#res.write(`data: ${data}\n\n`);
      return;
    }

    if (data.id) this.#res.write(`id: ${data.id}\n`);
    if (data.event) this.#res.write(`event: ${data.event}\n`);

    let text: string;
    if (typeof (data.data) === 'string') {
      text = data.data;
    } else {
      text = JSON.stringify(data.data);
    }
    this.#res.write(`data: ${text}\n\n`);
  }

  /**
   * write empty comment
   */
  keepAlive = () => {
    this.#res.write(':\n\n');
  }

  close = () => {
    this.#res.end();
  }
}
