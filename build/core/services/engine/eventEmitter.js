import { EventEmitter } from 'events';
export default class EngineEventEmitter extends EventEmitter {
    on(event, listener) {
        return super.on(event, listener);
    }
    off(event, listener) {
        return super.off(event, listener);
    }
    emit(event, context, variables = []) {
        return super.emit(event, context, variables);
    }
}
