var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Action, Utils, FollowUpActionArgumentsValidatorWithMessage } from '../../../../index.js';
import { IsInt, IsPositive, IsOptional, IsString, IsBoolean } from 'class-validator';
import { ChannelType } from 'discord.js';
class ArgumentsValidator extends FollowUpActionArgumentsValidatorWithMessage {
    value;
    duration;
    private;
    tags;
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
    IsBoolean(),
    __metadata("design:type", Boolean)
], ArgumentsValidator.prototype, "private", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ArgumentsValidator.prototype, "tags", void 0);
export default class CreateThreadAction extends Action {
    id = "createThread";
    argumentsValidator = ArgumentsValidator;
    async onTrigger(script, context, variables) {
        let thread;
        const channel = context.channel;
        if (!channel)
            return script.missingContext("channel", context);
        let message = context.message;
        const name = (await Utils.applyVariables(script.args.getStringOrNull("value"), variables, context)) || "Thread";
        const autoArchiveDuration = script.args.getNumberOrNull("duration") || 60;
        if (channel.type === ChannelType.GuildForum) {
            const messageConfig = (await Utils.setupMessage({ config: script.args, context, variables })) || undefined;
            const appliedTags = script.args.has("tags")
                ? await Promise.all(script.args.getStrings("tags").map((tag) => Utils.applyVariables(tag, variables, context)))
                : undefined;
            thread = await channel.threads.create({ name, autoArchiveDuration, message: messageConfig, appliedTags });
            message = await thread.fetchStarterMessage() || message;
        }
        if (channel.type === ChannelType.GuildAnnouncement) {
            thread = await channel.threads.create({ name, autoArchiveDuration });
        }
        if (channel.type === ChannelType.GuildText) {
            const threadType = script.args.getBoolOrNull("private") === true
                ? ChannelType.PrivateThread
                : ChannelType.PublicThread;
            thread = await channel.threads.create({ name, autoArchiveDuration, type: threadType });
        }
        if (!thread)
            return script.missingContext("channel", context);
        const newContext = {
            ...context,
            message: message,
            content: thread.name,
            channel: thread
        };
        this.triggerFollowUpActions(script, newContext, variables);
    }
}
