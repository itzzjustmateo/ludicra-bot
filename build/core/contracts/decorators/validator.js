var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { manager, Utils } from '../../../index.js';
import { validate, ValidatorConstraint } from 'class-validator';
import { plainToInstance } from 'class-transformer';
let IsPermissionFlag = class IsPermissionFlag {
    validate(value, args) {
        const permission = Utils.getPermissionFlags(value.toString());
        return permission !== undefined;
    }
    defaultMessage(args) {
        return 'Permission must be a valid permission flag.';
    }
};
IsPermissionFlag = __decorate([
    ValidatorConstraint({ name: 'isPermissionFlag', async: false })
], IsPermissionFlag);
export { IsPermissionFlag };
let IsActivityType = class IsActivityType {
    validate(value, args) {
        const activityType = Utils.getActivityType(value.toString());
        return activityType !== undefined;
    }
    defaultMessage(args) {
        return 'This is not a valid activity type. Please use one of the following: PLAYING, STREAMING, LISTENING, WATCHING, COMPETING';
    }
};
IsActivityType = __decorate([
    ValidatorConstraint({ name: 'isActivityType', async: false })
], IsActivityType);
export { IsActivityType };
let IsTextInputStyle = class IsTextInputStyle {
    validate(value, args) {
        const textInputStyle = Utils.getTextInputStyle(value.toString());
        return textInputStyle !== undefined;
    }
    defaultMessage(args) {
        return 'This is not a valid activity type. Please use one of the following: PLAYING, STREAMING, LISTENING, WATCHING, COMPETING';
    }
};
IsTextInputStyle = __decorate([
    ValidatorConstraint({ name: 'isTextInputStyle', async: false })
], IsTextInputStyle);
export { IsTextInputStyle };
let IsCommandOptionType = class IsCommandOptionType {
    validate(value, args) {
        const commandOptionType = Utils.getCommandOptionType(value.toString());
        return commandOptionType !== undefined;
    }
    defaultMessage(args) {
        return 'This is not a command option type.';
    }
};
IsCommandOptionType = __decorate([
    ValidatorConstraint({ name: 'isCommandOptionType', async: false })
], IsCommandOptionType);
export { IsCommandOptionType };
let IsChannelType = class IsChannelType {
    validate(value, args) {
        const channelType = Utils.getChannelType(value.toString());
        return channelType !== undefined;
    }
    defaultMessage(args) {
        return 'This is not a valid channel type. Please use one of the following: GUILD_TEXT, GUILD_VOICE, GUILD_CATEGORY, GUILD_NEWS, GUILD_STORE, GUILD_NEWS_THREAD, GUILD_PUBLIC_THREAD, GUILD_PRIVATE_THREAD, GUILD_STAGE_VOICE';
    }
};
IsChannelType = __decorate([
    ValidatorConstraint({ name: 'isChannelType', async: false })
], IsChannelType);
export { IsChannelType };
let IsBooleanOrString = class IsBooleanOrString {
    validate(value, args) {
        return typeof value === 'boolean' || typeof value === 'string';
    }
    defaultMessage(args) {
        return 'This is not a valid type. Please use either a boolean or a string.';
    }
};
IsBooleanOrString = __decorate([
    ValidatorConstraint({ name: 'isBooleanOrString', async: false })
], IsBooleanOrString);
export { IsBooleanOrString };
let IsNumberOrString = class IsNumberOrString {
    validate(value, args) {
        return typeof value === 'number' || typeof value === 'string';
    }
    defaultMessage(args) {
        return 'This is not a valid type. Please use either a number or a string.';
    }
};
IsNumberOrString = __decorate([
    ValidatorConstraint({ name: 'isNumberOrString', async: false })
], IsNumberOrString);
export { IsNumberOrString };
let IsValidMetaKey = class IsValidMetaKey {
    validate(value, args) {
        return manager.services.engine.metaHandler.metas.has(value);
    }
    defaultMessage(args) {
        return `The meta key ${args.value} does not exist. Please define it in the meta configuration.`;
    }
};
IsValidMetaKey = __decorate([
    ValidatorConstraint({ name: 'isValidMetaKey', async: false })
], IsValidMetaKey);
export { IsValidMetaKey };
let IsNumberMeta = class IsNumberMeta {
    validate(value, args) {
        const meta = manager.services.engine.metaHandler.metas.get(value);
        return meta?.type == 'number';
    }
    defaultMessage(args) {
        return `The meta key ${args.value} is not of type number.`;
    }
};
IsNumberMeta = __decorate([
    ValidatorConstraint({ name: 'isNumberMeta', async: false })
], IsNumberMeta);
export { IsNumberMeta };
let IsBooleanMeta = class IsBooleanMeta {
    validate(value, args) {
        const meta = manager.services.engine.metaHandler.metas.get(value);
        return meta?.type == 'boolean';
    }
    defaultMessage(args) {
        return `The meta key ${args.value} is not of type boolean.`;
    }
};
IsBooleanMeta = __decorate([
    ValidatorConstraint({ name: 'isBooleanMeta', async: false })
], IsBooleanMeta);
export { IsBooleanMeta };
let IsListMeta = class IsListMeta {
    validate(value, args) {
        const meta = manager.services.engine.metaHandler.metas.get(value);
        return meta?.type == 'list';
    }
    defaultMessage(args) {
        return `The meta key ${args.value} is not of type list.`;
    }
};
IsListMeta = __decorate([
    ValidatorConstraint({ name: 'isListMeta', async: false })
], IsListMeta);
export { IsListMeta };
let IsNotListMeta = class IsNotListMeta {
    validate(value, args) {
        const meta = manager.services.engine.metaHandler.metas.get(value);
        return meta?.type !== 'list';
    }
    defaultMessage(args) {
        return `The meta key ${args.value} is not a valid type. Should be string, number, or boolean.`;
    }
};
IsNotListMeta = __decorate([
    ValidatorConstraint({ name: 'isNotListMeta', async: false })
], IsNotListMeta);
export { IsNotListMeta };
const actionArgsErrors = new WeakMap();
const conditionArgsErrors = new WeakMap();
export const getActionArgsChildErrors = (value) => actionArgsErrors.get(value);
export const getConditionArgsChildErrors = (value) => conditionArgsErrors.get(value);
let IsValidActionId = class IsValidActionId {
    validate(value, args) {
        return manager.services.action.actions.has(value);
    }
    defaultMessage(args) {
        return `The action ID ${args.value} does not exist.`;
    }
};
IsValidActionId = __decorate([
    ValidatorConstraint({ name: 'isValidActionId', async: false })
], IsValidActionId);
export { IsValidActionId };
let IsValidActionArgs = class IsValidActionArgs {
    async validate(value, args) {
        const object = args.object;
        if (!object?.id)
            return true;
        const action = manager.services.action.actions.get(object.id);
        if (!action)
            return true;
        actionArgsErrors.delete(value);
        if (action.argumentsValidator) {
            const config = plainToInstance(action.argumentsValidator, value);
            const errors = await validate(config, {
                validationError: { target: false },
                whitelist: true,
                forbidNonWhitelisted: true,
                skipMissingProperties: true,
            });
            if (errors.length > 0) {
                actionArgsErrors.set(value, errors);
                return false;
            }
        }
        return true;
    }
    defaultMessage(args) {
        const object = args.object;
        return `Invalid action arguments for action ${object?.id ?? '(unknown)'}:`;
    }
};
IsValidActionArgs = __decorate([
    ValidatorConstraint({ name: 'isValidActionArgs', async: true })
], IsValidActionArgs);
export { IsValidActionArgs };
let IsValidConditionId = class IsValidConditionId {
    validate(value, args) {
        return manager.services.condition.conditions.has(String(value).replace('!', ''));
    }
    defaultMessage(args) {
        return `The condition ID ${args.value} does not exist.`;
    }
};
IsValidConditionId = __decorate([
    ValidatorConstraint({ name: 'isValidConditionId', async: false })
], IsValidConditionId);
export { IsValidConditionId };
let IsValidConditionArgs = class IsValidConditionArgs {
    async validate(value, args) {
        const object = args.object;
        if (!object?.id)
            return true;
        const condition = manager.services.condition.conditions.get(object.id);
        if (!condition)
            return true;
        conditionArgsErrors.delete(value);
        if (condition.argumentsValidator) {
            const config = plainToInstance(condition.argumentsValidator, value);
            const errors = await validate(config, {
                validationError: { target: false },
                whitelist: true,
                forbidNonWhitelisted: true,
                skipMissingProperties: true,
            });
            if (errors.length > 0) {
                conditionArgsErrors.set(value, errors);
                return false;
            }
        }
        return true;
    }
    defaultMessage(args) {
        const object = args.object;
        return `Invalid condition arguments for condition ${object?.id ?? '(unknown)'}:`;
    }
};
IsValidConditionArgs = __decorate([
    ValidatorConstraint({ name: 'isValidConditionArgs', async: true })
], IsValidConditionArgs);
export { IsValidConditionArgs };
let IsNumberAndUserMeta = class IsNumberAndUserMeta {
    validate(value, args) {
        const config = args.object;
        return config.type === 'number' && (config.mode === 'user' || config.mode === 'channel');
    }
    defaultMessage(validationArguments) {
        return `The leaderboard configuration is only valid for metas of type number and mode user or channel.`;
    }
};
IsNumberAndUserMeta = __decorate([
    ValidatorConstraint({ name: 'isNumberAndUserMeta', async: false })
], IsNumberAndUserMeta);
export { IsNumberAndUserMeta };
