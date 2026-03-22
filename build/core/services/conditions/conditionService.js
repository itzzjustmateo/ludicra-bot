import { Collection } from 'discord.js';
import { ConditionData, Service } from '../../../index.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'fs/promises';
/**
 * Service to manage conditions in the bot.
 * Conditions are used to check if a condition is met in the scripting system in the engine.
 */
export default class ConditionService extends Service {
    conditions;
    constructor(manager) {
        super(manager);
        this.conditions = new Collection();
    }
    async initialize() {
        await this.registerFromDir(join(dirname(fileURLToPath(import.meta.url)), 'impl'));
        this.manager.logger.info("Condition service initialized.");
    }
    async registerFromDir(conditionsDir, addon = undefined) {
        const conditionFiles = await Array.fromAsync(glob(join(conditionsDir, '**', '*.js').replace(/\\/g, '/')));
        await Promise.all(conditionFiles.map(async (filePath) => {
            const conditionPath = new URL('file://' + filePath.replace(/\\/g, '/')).href;
            const { default: condition } = await import(conditionPath);
            this.registerCondition(new condition(this.manager, addon));
        }));
    }
    registerCondition(condition) {
        if (this.conditions.has(condition.id))
            return condition.logger.warn(`Condition ${condition.id} is already registered`);
        this.conditions.set(condition.id, condition);
    }
    unregisterByAddon(addon) {
        for (const [id, condition] of this.conditions) {
            if (condition.addon === addon) {
                this.conditions.delete(id);
            }
        }
    }
    parseConditions(conditions, notMetAction = true) {
        if (!conditions)
            return [];
        return conditions.map(condition => new ConditionData(this.manager, condition, notMetAction));
    }
    async meetsConditions(conditions, context, variables) {
        if (!conditions)
            return true;
        for (const condition of conditions) {
            const isMet = await this.isConditionMet(condition, context, variables);
            if (!isMet)
                return false;
        }
        return true;
    }
    async isConditionMet(conditionData, context, variables) {
        const condition = this.conditions.get(conditionData.id);
        if (!condition) {
            conditionData.logger.warn(`No condition found for ID: ${conditionData.id}`);
            return false;
        }
        let isMet = await condition.isMet(conditionData, context, variables);
        if (conditionData.args.getBoolOrNull("inverse")) {
            isMet = !isMet;
        }
        if (!isMet) {
            for (const subAction of conditionData.notMetActions) {
                await subAction.run(context, variables);
            }
        }
        return isMet;
    }
}
