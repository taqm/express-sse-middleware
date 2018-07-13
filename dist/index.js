"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler = function (req, res, next) {
    res.sse = (param = {}) => {
        res.writeHead(param.statusCode || 200, Object.assign({
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
        }, param.headers));
        res.write('\n');
        return (data = '') => {
            if (typeof (data) === 'string') {
                res.write(`data: ${data}\n\n`);
                return;
            }
            // connection keeping
            if (data.keep) {
                res.write(':\n\n');
                return;
            }
            if (data.id)
                res.write(`id: ${data.event}\n`);
            if (data.event)
                res.write(`event: ${data.event}\n`);
            res.write(`data: ${data.data}\n\n`);
        };
    };
    next();
};
exports.default = handler;
