var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Condition, ConditionArgumentValidator, ConditionValidator } from '../../../../index.js';
import { Type } from 'class-transformer';
import { IsArray, IsDefined, ValidateNested } from 'class-validator';
class ArgumentsValidator extends ConditionArgumentValidator {
    conditions;
}
__decorate([
    IsDefined(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => ConditionValidator),
    __metadata("design:type", Array)
], ArgumentsValidator.prototype, "conditions", void 0);
export default class AnyOfCondition extends Condition {
    id = "anyOf";
    argumentsValidator = ArgumentsValidator;
    async isMet(condition, context, variables) {
        const conditionsConfig = condition.args.getSubsections("conditions");
        const conditions = this.manager.services.condition.parseConditions(conditionsConfig, false);
        const isMet = await Promise.all(conditions.map(condition => this.manager.services.condition.isConditionMet(condition, context, variables)));
        return isMet.some(result => result);
    }
}
