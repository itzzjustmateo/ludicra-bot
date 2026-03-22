var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Condition, ConditionArgumentValidator, Utils } from '../../../../index.js';
import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator';
class ArgumentsValidator extends ConditionArgumentValidator {
    input;
    output;
    'ignore-case';
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], ArgumentsValidator.prototype, "input", void 0);
__decorate([
    IsDefined(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ArgumentsValidator.prototype, "output", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], ArgumentsValidator.prototype, "ignore-case", void 0);
export default class TextStartsWithCondition extends Condition {
    id = "textStartsWith";
    argumentsValidator = ArgumentsValidator;
    async isMet(condition, context, variables) {
        const input = await Utils.applyVariables(condition.args.getString("input"), variables, context);
        const output = await Promise.all(condition.args.getStrings("output").map(async (text) => await Utils.applyVariables(text, variables, context)));
        const ignoreCase = condition.args.getBoolOrNull("ignore-case") ?? false;
        if (ignoreCase) {
            return output.some(text => input.toLowerCase().startsWith(text.toLowerCase()));
        }
        return output.some(text => input.startsWith(text));
    }
}
