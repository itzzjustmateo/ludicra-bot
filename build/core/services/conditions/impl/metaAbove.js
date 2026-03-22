var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Condition, ConditionArgumentValidator, IsValidMetaKey, IsNumberMeta, Utils, IsNumberOrString } from '../../../../index.js';
import { IsDefined, IsString, Validate } from 'class-validator';
class ArgumentsValidator extends ConditionArgumentValidator {
    key;
    value;
}
__decorate([
    IsDefined(),
    IsString(),
    Validate(IsValidMetaKey),
    Validate(IsNumberMeta),
    __metadata("design:type", String)
], ArgumentsValidator.prototype, "key", void 0);
__decorate([
    IsDefined(),
    Validate(IsNumberOrString),
    __metadata("design:type", Object)
], ArgumentsValidator.prototype, "value", void 0);
export default class MetaAboveCondition extends Condition {
    id = "metaAbove";
    argumentsValidator = ArgumentsValidator;
    async isMet(condition, context, variables) {
        const key = condition.args.getString("key");
        let value = condition.args.getString("value");
        value = await Utils.applyVariables(value, variables, context);
        const meta = this.manager.services.engine.metaHandler.metas.get(key);
        const scopeId = this.manager.services.engine.metaHandler.resolveScopeId(context, meta.mode);
        if (!scopeId) {
            this.logger.error(`Could not resolve scope ID for meta ${key} in mode ${meta.mode}.`);
            return false;
        }
        const metaData = await this.manager.services.engine.metaHandler.findOrCreate(key, '[ ]', scopeId);
        try {
            const numberValue = parseFloat(metaData.value);
            return numberValue > parseFloat(value);
        }
        catch (error) {
            this.logger.error(`Failed to parse meta value for ${key}: ${error}`);
            return false;
        }
    }
}
