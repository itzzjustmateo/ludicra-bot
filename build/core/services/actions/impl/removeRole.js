var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Action, ActionArgumentsValidator, Utils } from '../../../../index.js';
import { IsDefined, IsString } from 'class-validator';
class ArgumentsValidator extends ActionArgumentsValidator {
    value;
}
__decorate([
    IsDefined(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ArgumentsValidator.prototype, "value", void 0);
export default class RemoveRoleAction extends Action {
    id = "removeRole";
    argumentsValidator = ArgumentsValidator;
    async onTrigger(script, context, variables) {
        const rolesToRemove = script.args.getStrings("value");
        if (!context.member)
            return script.missingContext("member", context);
        let roles = await Promise.all(rolesToRemove.map(async (roleName) => Utils.findRole(await Utils.applyVariables(roleName, variables, context), context.guild)));
        roles = roles.filter(Boolean);
        if (roles.length) {
            context.member.roles.remove(roles);
        }
    }
}
