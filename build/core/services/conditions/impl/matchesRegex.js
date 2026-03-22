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
import { IsDefined, IsString } from 'class-validator';
class ArgumentsValidator extends ConditionArgumentValidator {
    value;
}
__decorate([
    IsDefined(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ArgumentsValidator.prototype, "value", void 0);
export default class MatchesRegexCondition extends Condition {
    id = "matchesRegex";
    argumentsValidator = ArgumentsValidator;
    isMet(condition, context, variables) {
        const arg = condition.args.getStrings("value");
        if (!context.content)
            return false;
        return arg && arg.some(regex => new RegExp(regex).test(context.content));
    }
}
