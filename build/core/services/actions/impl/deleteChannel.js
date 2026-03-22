import { Action } from '../../../../index.js';
export default class DeleteChannelAction extends Action {
    id = "deleteChannel";
    async onTrigger(script, context, variables) {
        if (!context.channel)
            return script.missingContext("channel", context);
        await context.channel.delete(`Channel deleted by action: ${script.id}`);
    }
}
