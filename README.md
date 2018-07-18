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
import sseMiddleware from 'express-sse-middleware';

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

## Dependency
This middleware is not depend on anything.

