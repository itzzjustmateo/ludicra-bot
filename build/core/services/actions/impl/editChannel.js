var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Action, IsChannelType, Utils, ActionArgumentsValidator, PermissionOverwrites } from '../../../../index.js';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, Validate, ValidateNested } from 'class-validator';
import { ChannelType } from 'discord.js';
class ArgumentsValidator extends ActionArgumentsValidator {
    value;
    description;
    'permission-overwrites';
    'channel-type';
    parent;
}
__decorate([
    IsOptional(),
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
export default class EditChannelAction extends Action {
    id = "editChannel";
    argumentsValidator = ArgumentsValidator;
    async onTrigger(script, context, variables) {
        const channelName = await Utils.applyVariables(script.args.getStringOrNull("value", true), variables, context) || undefined;
        const parent = script.args.getStringOrNull("parent");
        const description = await Utils.applyVariables(script.args.getStringOrNull("description", true), variables, context) || undefined;
        const permissionOverwrites = script.args.has("permission-overwrites") ? await Promise.all(script.args.getSubsections("permission-overwrites").map(async (overwrite) => {
            return {
                id: await Utils.applyVariables(overwrite.getString("id"), variables, context),
                allow: overwrite.getStringsOrNull("allow"),
                deny: overwrite.getStringsOrNull("deny")
            };
        })) : undefined;
        if (!context.channel)
            return script.missingContext("channel", context);
        if (context.channel.type === ChannelType.DM || context.channel.type === ChannelType.GroupDM) {
            return script.logError("Cannot create a channel in a DM context.");
        }
        await context.channel.edit({
            name: channelName,
            parent: parent,
            reason: `Channel edited by action: ${script.id}`,
            topic: description,
            permissionOverwrites: permissionOverwrites
        });
    }
}
