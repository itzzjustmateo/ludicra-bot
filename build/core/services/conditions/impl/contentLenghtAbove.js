var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Condition, ConditionArgumentValidator } from '../../../../index.js';
import { IsDefined, IsNumber, IsPositive, Min } from 'class-validator';
class ArgumentsValidator extends ConditionArgumentValidator {
    amount;
}
__decorate([
    IsDefined(),
    IsNumber(),
    IsPositive(),
    Min(1),
    __metadata("design:type", Number)
], ArgumentsValidator.prototype, "amount", void 0);
export default class ContentLengthAboveCondition extends Condition {
    id = "contentLengthAbove";
    argumentsValidator = ArgumentsValidator;
    isMet(condition, context, variables) {
        condition.logWarning('The "contentLengthAbove" condition is deprecated. Please use the "textLengthAbove" condition instead.');
        const arg = condition.args.getNumber("amount");
        if (!context.content)
            return false;
        return context.content.length > arg;
    }
}
