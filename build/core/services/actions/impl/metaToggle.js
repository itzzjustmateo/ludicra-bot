var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Action, ActionArgumentsValidator, IsValidMetaKey, Utils } from '../../../../index.js';
import { IsDefined, IsString, Validate } from 'class-validator';
class ArgumentsValidator extends ActionArgumentsValidator {
    value;
    key;
}
__decorate([
    IsDefined(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ArgumentsValidator.prototype, "value", void 0);
__decorate([
    IsDefined(),
    IsString(),
    Validate(IsValidMetaKey),
    __metadata("design:type", String)
], ArgumentsValidator.prototype, "key", void 0);
export default class MetaToggleAction extends Action {
    id = "metaToggle";
    argumentsValidator = ArgumentsValidator;
    async onTrigger(script, context, variables) {
        const key = script.args.getString("key");
        const value = await Utils.applyVariables(script.args.getString("value"), variables, context);
        const parsedValue = Utils.evaluateBoolean(value);
        if (!parsedValue)
            return script.missingArg("value", context);
        const meta = this.manager.services.engine.metaHandler.metas.get(key);
        switch (meta.mode) {
            case 'user':
                if (!context.user)
                    return script.missingContext("user", context);
                const userMeta = await this.manager.services.engine.metaHandler.findOrCreate(key, parsedValue.toString(), context.user.id);
                await userMeta.toggle(parsedValue);
                break;
            case 'channel':
                if (!context.channel)
                    return script.missingContext("channel", context);
                const channelMeta = await this.manager.services.engine.metaHandler.findOrCreate(key, parsedValue.toString(), context.channel.id);
                await channelMeta.toggle(parsedValue);
                break;
            case 'message':
                if (!context.message)
                    return script.missingContext("message", context);
                const messageMeta = await this.manager.services.engine.metaHandler.findOrCreate(key, parsedValue.toString(), context.message.id);
                await messageMeta.toggle(parsedValue);
                break;
            case 'global':
                const globalMeta = await this.manager.services.engine.metaHandler.findOrCreate(key, parsedValue.toString(), 'global');
                await globalMeta.toggle(parsedValue);
                break;
        }
    }
}
