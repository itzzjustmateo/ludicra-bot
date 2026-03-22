import { Action } from '../../../../index.js';
export default class PinMessageAction extends Action {
    id = "pinMessage";
    async onTrigger(script, context, variables) {
        if (!context.message)
            return script.missingContext("message", context);
        await context.message.pin();
    }
}
