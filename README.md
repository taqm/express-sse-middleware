[![npm version](https://badge.fury.io/js/express-sse-middleware.svg)](https://badge.fury.io/js/express-sse-middleware)

# express-sse-middleware
It's a [Express](https://github.com/expressjs/express) middleware that simply and easily using Server Sent Events (SSE) 

## Installation

```
npm install express-sse-middleware
```

## How to use

### Simple Usage
```javascript
import express from 'express';
import { sseMiddleware } from 'express-sse-middleware';

app.use(sseMiddleware);
app.get('/path', (req, res) => {
  const sse = res.sse(); // `adding Response.sse()` funciton

  let count = 0;
  setInterval(() => {
    sse.send(String(count++));
  }, 1000);
  
  // sent incremented number every second.
  // ↓
  // data: 0
  // data: 1
  // data: ...

});

app.listen(3000);
```

### EventBuilder
Prepared a simple event builder.
but params of `send` function is so simple that No need to use.
```ts
  let count = 0;
  const builder = new EventBuilder() // <- Builder instance is immutable.
                        .id('test_id')
                        .event('event_name');
  setInterval(() => {
    sse.send(builder.data(String(count++)).build());
  }, 1000);

  // ↓
  // id: test_id
  // event: event_name
  // data: 0
  // 
  // id: test_id
  // event: event_name
  // data: 1
```

## Dependency
This middleware is not depend on anything.

