import { BaseScript } from '../../../index.js';
export class CustomCommand extends BaseScript {
    async run(context, variables) {
        if (!await this.meetsConditions(context, variables))
            return;
        for (const action of this.actions) {
            await action.run(context, variables);
        }
    }
}
