import { Action, Utils, FollowUpActionArgumentsValidatorWithMessage } from '../../../../index.js';
export default class SendMessageAction extends Action {
    id = "sendMessage";
    argumentsValidator = FollowUpActionArgumentsValidatorWithMessage;
    async onTrigger(script, context, variables) {
        if (!context.channel || !context.channel.isTextBased() || context.channel.isDMBased())
            return script.missingContext("channel", context);
        const message = await context.channel.send(await Utils.setupMessage({ config: script.args, context, variables }));
        const newContext = {
            ...context,
            message,
            content: message.content,
            channel: message.channel
        };
        this.triggerFollowUpActions(script, newContext, variables);
    }
}
