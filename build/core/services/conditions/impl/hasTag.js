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
    IsString({ each: true }),
    __metadata("design:type", Object)
], ArgumentsValidator.prototype, "value", void 0);
export default class HasTagCondition extends Condition {
    id = "hasTag";
    argumentsValidator = ArgumentsValidator;
    async isMet(condition, context, variables) {
        if (!context.channel || !context.channel.isThread())
            return condition.missingContext("channel");
        let tags = condition.args.getStrings("value");
        const channelTags = context.channel.appliedTags;
        tags = await Promise.all(tags.map(tag => Utils.applyVariables(tag, variables, context)));
        return tags.some(tag => channelTags.includes(tag));
    }
}
