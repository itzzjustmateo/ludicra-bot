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
import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator';
class ArgumentsValidator extends ConditionArgumentValidator {
    value;
    'ignore-case';
}
__decorate([
    IsDefined(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ArgumentsValidator.prototype, "value", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], ArgumentsValidator.prototype, "ignore-case", void 0);
export default class ContentEndsWithCondition extends Condition {
    id = "contentEndsWith";
    argumentsValidator = ArgumentsValidator;
    isMet(condition, context, variables) {
        condition.logWarning('The "contentEndsWith" condition is deprecated. Please use the "textEndsWith" condition instead.');
        const arg = condition.args.getStrings("value");
        if (!context.content)
            return false;
        const ignoreCase = condition.args.getBoolOrNull("ignore-case") ?? false;
        if (ignoreCase) {
            return arg && arg.some(text => context.content?.toLowerCase().endsWith(text.toLowerCase()));
        }
        return arg && arg.some(text => context.content?.endsWith(text));
    }
}
