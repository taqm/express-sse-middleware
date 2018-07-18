import { EventData } from '.';

interface OptionalSetter {
  id(id: string): OptionalSetter & DataSetter;
  event(event: string): OptionalSetter & DataSetter;
}
interface DataSetter {
  data(data: string | object): { build(): EventData };
}

class EventBuilder implements OptionalSetter, DataSetter {

  private _id: string | null = null;
  private _event: string | null = null;
  private _data: string | object = {};

  id(id: string) {
    this._id = id;
    return this;
  }
  event(event: string) {
    this._event = event;
    return this;
  };

  data(data: string | object) {
    this._data = data;
    return {
      build: (): EventData => ({
        id: this._id,
        event: this._event,
        data: this._data,
      }),
    };
  }
}
export const builder = () => new EventBuilder();
