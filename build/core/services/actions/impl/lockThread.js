import { Action } from '../../../../index.js';
export default class LockThreadAction extends Action {
    id = "lockThread";
    async onTrigger(script, context, variables) {
        if (!context.channel || !context.channel.isThread())
            return script.missingContext("channel", context);
        await context.channel.setLocked(true, `Thread locked by action: ${script.id}`);
    }
}
