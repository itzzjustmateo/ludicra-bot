import { Base, ActionArgumentsValidator } from '../../../index.js';
export class Action extends Base {
    argumentsValidator = ActionArgumentsValidator;
    async trigger(script, context, variables) {
        const variablesCopy = [...variables];
        await this.onTrigger(script, context, variablesCopy);
    }
    async triggerFollowUpActions(script, context, variables) {
        for (const subAction of script.followUpActions) {
            await subAction.run(context, variables);
        }
    }
}
