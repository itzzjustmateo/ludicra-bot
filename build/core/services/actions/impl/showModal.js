import { Action, Utils, ActionArgumentsValidatorWithModal } from '../../../../index.js';
export default class ShowModalAction extends Action {
    id = "showModal";
    argumentsValidator = ActionArgumentsValidatorWithModal;
    async onTrigger(script, context, variables) {
        if (!context.interaction || context.interaction.isModalSubmit())
            return script.missingContext("interaction", context);
        const modal = await Utils.setupModal({ config: script.args, context, variables });
        await context.interaction.showModal(modal);
    }
}
