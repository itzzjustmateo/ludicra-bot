import { Action } from '../../../../index.js';
export default class UnlockThreadAction extends Action {
    id = "unlockThread";
    async onTrigger(script, context, variables) {
        if (!context.channel || !context.channel.isThread())
            return script.missingContext("channel", context);
        await context.channel.setLocked(false, `Thread unlocked by action: ${script.id}`);
    }
}
