import { BaseScript } from '../../../index.js';
import { Collection } from 'discord.js';
export class Script extends BaseScript {
    triggers = new Collection();
    loadTriggers() {
        for (const action of this.actions) {
            for (const trigger of action.triggers || []) {
                if (!this.triggers.has(trigger))
                    this.triggers.set(trigger, []);
                this.triggers.get(trigger)?.push(action);
            }
        }
        for (const [trigger, actions] of this.triggers) {
            this.manager.services.engine.event.on(trigger, async (context, variables) => {
                if (!await this.meetsConditions(context, []))
                    return;
                for (const action of actions) {
                    await action.run(context, variables);
                }
            });
        }
    }
}
