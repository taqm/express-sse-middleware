import { EventData } from '.';

interface OptionalSetter<E> {
  id(id: string): OptionalSetter<E> & DataSetter<E>;
  event(event: string): OptionalSetter<E> & DataSetter<E>;
}
interface DataSetter<E> {
  data(data: E): { build(): EventData<E> };
}

class EventBuilder<E> implements OptionalSetter<E>, DataSetter<E> {
  #id: string | null = null;

  #event: string | null = null;

  #data: E | null = null;

  id(id: string) {
    this.#id = id;
    return this;
  }

  event(event: string) {
    this.#event = event;
    return this;
  }

  data(data: E) {
    this.#data = data;
    return {
      build: (): EventData<E> => ({
        id: this.#id,
        event: this.#event,
        data: this.#data,
      }),
    };
  }
}

export default () => new EventBuilder();
