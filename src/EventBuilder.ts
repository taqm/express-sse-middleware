import { EventData } from '.';

interface OptionalSetter<E> {
  id(id: string): OptionalSetter<E> & DataSetter<E>;
  event(event: string): OptionalSetter<E> & DataSetter<E>;
}
interface DataSetter<E> {
  data(data: E): { build(): EventData<E> };
}

class EventBuilder<E> implements OptionalSetter<E>, DataSetter<E> {

  private _id: string | null = null;
  private _event: string | null = null;
  private _data: E | null = null;

  id(id: string) {
    this._id = id;
    return this;
  }
  event(event: string) {
    this._event = event;
    return this;
  };

  data(data: E) {
    this._data = data;
    return {
      build: (): EventData<E> => ({
        id: this._id,
        event: this._event,
        data: this._data,
      }),
    };
  }
}
export const builder = () => new EventBuilder();
