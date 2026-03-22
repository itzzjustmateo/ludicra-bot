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
import { IsArray, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
class ArgumentsValidator extends ActionArgumentsValidator {
    value;
    duration;
    'tags';
}
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ArgumentsValidator.prototype, "value", void 0);
__decorate([
    IsOptional(),
    IsInt(),
    IsPositive(),
    __metadata("design:type", Number)
], ArgumentsValidator.prototype, "duration", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], ArgumentsValidator.prototype, "tags", void 0);
export default class EditThreadAction extends Action {
    id = "editThread";
    argumentsValidator = ArgumentsValidator;
    async onTrigger(script, context, variables) {
        if (!context.channel || !context.channel.isThread())
            return script.missingContext("channel", context);
        return context.channel.edit({
            name: await Utils.applyVariables(script.args.getStringOrNull("value", true), variables, context),
            autoArchiveDuration: script.args.getNumberOrNull("duration"),
            appliedTags: script.args.has("tags") ? await Promise.all(script.args.getStrings("tags").map(async (tag) => await Utils.applyVariables(tag, variables, context))) : undefined
        });
    }
}
