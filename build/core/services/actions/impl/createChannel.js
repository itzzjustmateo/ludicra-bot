var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Action, PermissionOverwrites, Utils, IsChannelType, FollowUpActionArgumentsValidator } from '../../../../index.js';
import { Type } from 'class-transformer';
import { IsArray, IsDefined, IsOptional, IsString, Validate, ValidateNested } from 'class-validator';
import { ChannelType } from 'discord.js';
class ArgumentsValidator extends FollowUpActionArgumentsValidator {
    value;
    description;
    'permission-overwrites';
    'channel-type';
    parent;
}
__decorate([
    IsDefined(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ArgumentsValidator.prototype, "value", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ArgumentsValidator.prototype, "description", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    Type(() => PermissionOverwrites),
    ValidateNested({ each: true }),
    __metadata("design:type", Array)
], ArgumentsValidator.prototype, "permission-overwrites", void 0);
__decorate([
    IsOptional(),
    IsString(),
    Validate(IsChannelType),
    __metadata("design:type", String)
], ArgumentsValidator.prototype, "channel-type", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ArgumentsValidator.prototype, "parent", void 0);
export default class CreateChannelAction extends Action {
    id = "createChannel";
    argumentsValidator = ArgumentsValidator;
    async onTrigger(script, context, variables) {
        const channelName = await Utils.applyVariables(script.args.getString("value", true), variables, context);
        const description = await Utils.applyVariables(script.args.getStringOrNull("description", true), variables, context) || undefined;
        const permissionOverwrites = script.args.has("permission-overwrites") ? await Promise.all(script.args.getSubsections("permission-overwrites").map(async (overwrite) => {
            return {
                id: await Utils.applyVariables(overwrite.getString("id"), variables, context),
                allow: overwrite.getStringsOrNull("allow"),
                deny: overwrite.getStringsOrNull("deny")
            };
        })) : undefined;
        const type = script.args.getStringOrNull("channel-type");
        let channelType;
        if (type) {
            channelType = Utils.getChannelType(type) || ChannelType.GuildText;
        }
        else {
            channelType = ChannelType.GuildText;
        }
        if (!context.guild)
            return script.missingContext("guild", context);
        const channel = await context.guild.channels.create({
            name: channelName,
            type: channelType,
            parent: script.args.getStringOrNull("parent"),
            reason: `Channel created by action: ${script.id}`,
            topic: description,
            permissionOverwrites: permissionOverwrites,
        });
        const newContext = {
            ...context,
            channel: channel,
            content: channel.name,
        };
        this.triggerFollowUpActions(script, newContext, variables);
    }
}
