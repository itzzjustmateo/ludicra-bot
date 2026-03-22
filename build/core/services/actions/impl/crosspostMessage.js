import { Action } from '../../../../index.js';
export default class CrosspostMessageAction extends Action {
    id = "crosspostMessage";
    async onTrigger(script, context, variables) {
        if (!context.message)
            return script.missingContext("message", context);
        if (context.message.crosspostable)
            await context.message.crosspost();
    }
}
