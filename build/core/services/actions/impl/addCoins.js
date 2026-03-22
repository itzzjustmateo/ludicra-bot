var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Action, ActionArgumentsValidator, IsNumberOrString, Utils } from '../../../../index.js';
import { IsDefined, Validate } from 'class-validator';
class ArgumentsValidator extends ActionArgumentsValidator {
    amount;
}
__decorate([
    IsDefined(),
    Validate(IsNumberOrString),
    __metadata("design:type", Object)
], ArgumentsValidator.prototype, "amount", void 0);
export default class AddCoinsAction extends Action {
    id = "addCoins";
    argumentsValidator = ArgumentsValidator;
    async onTrigger(script, context, variables) {
        const amount = script.args.getString("amount");
        const evaluatedAmount = Utils.evaluateNumber(await Utils.applyVariables(amount, variables, context));
        if (evaluatedAmount === null)
            return script.missingArg("amount", context);
        if (!context.user)
            return script.missingContext("user", context);
        context.user.addCoins(evaluatedAmount);
    }
}
