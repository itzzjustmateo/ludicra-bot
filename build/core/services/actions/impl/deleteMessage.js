import { Action } from '../../../../index.js';
export default class DeleteMessageAction extends Action {
    id = "deleteMessage";
    async onTrigger(script, context, variables) {
        if (!context.message)
            return script.missingContext("message", context);
        await context.message.delete();
    }
}
