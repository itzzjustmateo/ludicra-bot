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
import { GuildChannel } from 'discord.js';
import { IsDefined, IsString } from 'class-validator';
class ArgumentsValidator extends ConditionArgumentValidator {
    value;
}
__decorate([
    IsDefined(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ArgumentsValidator.prototype, "value", void 0);
export default class InChannelCondition extends Condition {
    id = "inChannel";
    argumentsValidator = ArgumentsValidator;
    isMet(condition, context, variables) {
        const arg = condition.args.getStrings("value");
        if (!context.channel)
            return condition.missingContext("channel");
        if (!(context.channel instanceof GuildChannel))
            return false;
        for (const channel of arg) {
            const dChannel = Utils.findChannel(channel, context.guild);
            if (!dChannel) {
                this.logger.warn(`Channel ${channel} not found in guild ${context.guild?.name}`);
                continue;
            }
            if (context.channel.id === dChannel.id || context.channel.parent?.id === dChannel.id)
                return true;
        }
        return false;
    }
}
