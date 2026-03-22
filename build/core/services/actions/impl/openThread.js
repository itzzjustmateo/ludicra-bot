import { Action } from '../../../../index.js';
export default class OpenThreadAction extends Action {
    id = "openThread";
    async onTrigger(script, context, variables) {
        if (!context.channel || !context.channel.isThread())
            return script.missingContext("channel", context);
        await context.channel.setArchived(false, `Thread opened by action: ${script.id}`);
    }
}
