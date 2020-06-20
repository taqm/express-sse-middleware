export type EventData<E> = {
  id?: string | null;
  event?: string | null;
  data: E | null;
};

/* eslint-disable no-underscore-dangle */
class EventBuilder<E> {
  private _id: string | null = null;

  private _event: string | null = null;

  private _data: E | null = null;

  id = (id: string) => {
    const obj = this.clone();
    obj._id = id;
    return obj;
  };

  event = (event: string) => {
    const obj = this.clone();
    obj._event = event;
    return obj;
  }

  data = (data: E) => {
    const obj = this.clone();
    obj._data = data;
    return obj;
  }

  build = (): EventData<E> => {
    if (this._data === null) {
      throw Error('data is required.');
    }
    return {
      id: this._id,
      event: this._event,
      data: this._data,
    };
  }

  private clone = () => {
    const newObj = new EventBuilder<E>();
    newObj._id = this._id;
    newObj._event = this._event;
    newObj._data = this._data;
    return newObj;
  };
}

export default EventBuilder;
