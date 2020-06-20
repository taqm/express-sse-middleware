import EventBuilder from '../src/EventBuilder';

type SampleEvent = {
  message: string;
};

describe('EventBuilder test.', () => {
  it('create event.', () => {
    const sut = new EventBuilder<SampleEvent>();

    const data = sut
      .id('test_id')
      .event('test_event')
      .data({ message: 'test_data' })
      .build();

    expect(data).toEqual({
      id: 'test_id',
      event: 'test_event',
      data: {
        message: 'test_data',
      },
    });
  });

  it('throw error if unset data.', () => {
    const sut = new EventBuilder<SampleEvent>()
      .id('test_id')
      .event('test_event');

    expect(() => sut.build()).toThrow();
  });
});
