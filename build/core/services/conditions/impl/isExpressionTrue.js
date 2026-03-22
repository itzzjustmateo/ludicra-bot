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
import { IsDefined, IsString } from 'class-validator';
class ArgumentsValidator extends ConditionArgumentValidator {
    value;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], ArgumentsValidator.prototype, "value", void 0);
export default class IsExpressionTrueCondition extends Condition {
    id = "isExpressionTrue";
    argumentsValidator = ArgumentsValidator;
    async isMet(condition, context, variables) {
        const expressionArg = condition.args.getString("value");
        const expression = await Utils.applyVariables(expressionArg, variables, context);
        if (!expression)
            return condition.logError("Invalid expression");
        try {
            const result = Utils.evaluateBoolean(expression);
            if (result === null)
                return condition.logError("Expression did not evaluate to a boolean");
            return result;
        }
        catch (error) {
            return false;
        }
    }
}
