var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Action, FollowUpActionArgumentsValidator, Utils } from '../../../../index.js';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
class ArgumentsValidator extends FollowUpActionArgumentsValidator {
    value;
    duration;
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
export default class StartThreadAction extends Action {
    id = "startThread";
    argumentsValidator = ArgumentsValidator;
    async onTrigger(script, context, variables) {
        if (!context.message)
            return script.missingContext("message", context);
        const thread = await context.message.startThread({
            name: await Utils.applyVariables(script.args.getStringOrNull("value"), variables, context) || "Thread",
            autoArchiveDuration: script.args.getNumberOrNull("duration") || 60
        });
        const newContext = {
            ...context,
            content: thread.name,
            channel: thread
        };
        this.triggerFollowUpActions(script, newContext, variables);
    }
}
