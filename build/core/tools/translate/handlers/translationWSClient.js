import WebSocket from 'ws';
import crypto from 'crypto';
export class TranslationWSClient {
    ws;
    tasks = new Map();
    constructor(url, token) {
        this.ws = new WebSocket(`${url}?token=${token}`);
        this.ws.on('message', (raw) => {
            const msg = JSON.parse(raw.toString());
            const task = this.tasks.get(msg.taskId);
            if (!task)
                return;
            switch (msg.event) {
                case 'done':
                    task.resolve({
                        buffer: Buffer.from(msg.data.buffer, 'base64'),
                        filename: msg.data.filename,
                        mime: msg.data.mime
                    });
                    this.tasks.delete(msg.taskId);
                    break;
                case 'error':
                    task.reject(new Error(msg.data.message));
                    this.tasks.delete(msg.taskId);
                    break;
            }
        });
        this.ws.on('close', (code) => {
            console.warn(`[WS] Closed with code ${code}`);
        });
        this.ws.on('error', (err) => {
            console.error('[WS] Error:', err);
        });
    }
    async translateFile(filename, buffer, lang) {
        const taskId = crypto.randomUUID();
        return new Promise((resolve, reject) => {
            this.tasks.set(taskId, { resolve, reject });
            const payload = {
                action: 'translate',
                payload: {
                    taskId,
                    filename,
                    buffer: buffer.toString('base64'),
                    lang,
                    mode: 'advanced'
                }
            };
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify(payload));
            }
            else {
                this.ws.once('open', () => {
                    this.ws.send(JSON.stringify(payload));
                });
            }
        });
    }
}
