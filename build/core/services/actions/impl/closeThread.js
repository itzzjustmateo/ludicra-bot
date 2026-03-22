import { Action } from '../../../../index.js';
export default class CloseThreadAction extends Action {
    id = "closeThread";
    async onTrigger(script, context, variables) {
        if (!context.channel || !context.channel.isThread())
            return script.missingContext("channel", context);
        await context.channel.setArchived(true, `Thread closed by action: ${script.id}`);
    }
}
