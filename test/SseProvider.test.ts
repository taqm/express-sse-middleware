import SseProvider from '../src/SseProvider';

describe('SseProvider test.', () => {
  const resMock = {
    write: jest.fn(),
    end: jest.fn(),
  };
  const provider = new SseProvider(resMock);

  beforeEach(() => {
    resMock.write.mockReset();
    resMock.end.mockReset();
  });

  it('send string data.', () => {
    provider.send('test event data');
    expect(resMock.write.mock.calls[0][0]).toBe(
      'data: test event data\n\n',
    );
  });

  it('send string data by $.data.', () => {
    provider.send({
      data: 'test event data',
    });
    expect(resMock.write.mock.calls[0][0]).toBe(
      'data: test event data\n\n',
    );
  });

  it('send object data by $.data.', () => {
    provider.send({
      data: {
        user_name: 'taro yamada',
        age: 30,
      },
    });

    expect(resMock.write.mock.calls[0][0]).toBe(
      `data: {"user_name":"taro yamada","age":30}\n\n`, // eslint-disable-line quotes
    );
  });

  it('send string data with id', () => {
    provider.send({
      id: 'test_id',
      data: 'test event data',
    });
    expect(resMock.write.mock.calls[0][0]).toBe(
      'id: test_id\n',
    );
    expect(resMock.write.mock.calls[1][0]).toBe(
      'data: test event data\n\n',
    );
  });

  it('send string data with eventName', () => {
    provider.send({
      event: 'test_event_name',
      data: 'test event data',
    });
    expect(resMock.write.mock.calls[0][0]).toBe(
      'event: test_event_name\n',
    );
    expect(resMock.write.mock.calls[1][0]).toBe(
      'data: test event data\n\n',
    );
  });

  it('send string data with id & eventName', () => {
    provider.send({
      id: 'test_id',
      event: 'test_event_name',
      data: 'test event data',
    });
    expect(resMock.write.mock.calls[0][0]).toBe(
      'id: test_id\n',
    );
    expect(resMock.write.mock.calls[1][0]).toBe(
      'event: test_event_name\n',
    );
    expect(resMock.write.mock.calls[2][0]).toBe(
      'data: test event data\n\n',
    );
  });
});
