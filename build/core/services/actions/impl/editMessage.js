import { Action, Utils, FollowUpActionArgumentsValidatorWithMessage } from '../../../../index.js';
export default class EditMessageAction extends Action {
    id = "editMessage";
    argumentsValidator = FollowUpActionArgumentsValidatorWithMessage;
    async onTrigger(script, context, variables) {
        if (!context.message)
            return script.missingContext("message", context);
        const message = await context.message.edit(await Utils.setupMessage({ config: script.args, context, variables }));
        const newContext = {
            ...context,
            message,
            content: message.content,
            channel: message.channel
        };
        this.triggerFollowUpActions(script, newContext, variables);
    }
}
