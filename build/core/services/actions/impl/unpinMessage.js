import { Action } from '../../../../index.js';
export default class UnpinMessageAction extends Action {
    id = "unpinMessage";
    async onTrigger(script, context, variables) {
        if (!context.message)
            return script.missingContext("message", context);
        await context.message.unpin();
    }
}
