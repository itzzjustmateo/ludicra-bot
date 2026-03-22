import { Action, Utils, ActionArgumentsValidator } from '../../../../index.js';
class ArgumentsValidator extends ActionArgumentsValidator {
    actions;
}
export default class RandomAction extends Action {
    id = "randomAction";
    argumentsValidator = ArgumentsValidator;
    async onTrigger(script, context, variables) {
        const actions = this.manager.services.action.parseActions(script.args.getSubsections("actions"));
        const action = Utils.getRandom(actions);
        await action.run(context, variables);
    }
}
