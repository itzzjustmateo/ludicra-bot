var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Type } from 'class-transformer';
import { IsString, IsInt, ValidateNested, IsOptional, ValidateIf, IsDefined, Max, Min, IsPositive, IsArray, IsBoolean, IsNumber, Validate } from 'class-validator';
import { IsPermissionFlag, IsValidActionArgs, IsValidActionId, IsValidConditionArgs, IsValidConditionId, MessageValidator, ModalValidator } from '../../../index.js';
export class ConditionArgumentValidator {
    inverse;
}
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], ConditionArgumentValidator.prototype, "inverse", void 0);
export class ConditionValidator {
    id;
    expression;
    args;
    inverse;
    value;
    conditions;
    'ignore-case';
    amount;
    key;
    inherit;
    'not-met-actions';
}
__decorate([
    ValidateIf(o => !o.expression),
    IsDefined(),
    IsString(),
    Validate(IsValidConditionId),
    __metadata("design:type", String)
], ConditionValidator.prototype, "id", void 0);
__decorate([
    ValidateIf(o => !o.id),
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], ConditionValidator.prototype, "expression", void 0);
__decorate([
    IsOptional(),
    Validate(IsValidConditionArgs),
    __metadata("design:type", ConditionArgumentValidator)
], ConditionValidator.prototype, "args", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], ConditionValidator.prototype, "inverse", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ConditionValidator.prototype, "value", void 0);
__decorate([
    IsOptional(),
    ValidateNested({ each: true }),
    Type(() => ConditionValidator),
    __metadata("design:type", Array)
], ConditionValidator.prototype, "conditions", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], ConditionValidator.prototype, "ignore-case", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], ConditionValidator.prototype, "amount", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ConditionValidator.prototype, "key", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], ConditionValidator.prototype, "inherit", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => ActionValidator),
    __metadata("design:type", Array)
], ConditionValidator.prototype, "not-met-actions", void 0);
export class MutatorValidator {
    content;
    channel;
    role;
    guild;
    member;
    user;
    message;
}
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], MutatorValidator.prototype, "content", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], MutatorValidator.prototype, "channel", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], MutatorValidator.prototype, "role", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], MutatorValidator.prototype, "guild", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], MutatorValidator.prototype, "member", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], MutatorValidator.prototype, "user", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], MutatorValidator.prototype, "message", void 0);
export class TargetValidator {
    channel;
    role;
    guild;
    member;
    user;
    message;
}
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], TargetValidator.prototype, "channel", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], TargetValidator.prototype, "role", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], TargetValidator.prototype, "guild", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], TargetValidator.prototype, "member", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], TargetValidator.prototype, "user", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], TargetValidator.prototype, "message", void 0);
export class PermissionOverwrites {
    id;
    allow;
    deny;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], PermissionOverwrites.prototype, "id", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    Validate(IsPermissionFlag, { each: true }),
    __metadata("design:type", Array)
], PermissionOverwrites.prototype, "allow", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    Validate(IsPermissionFlag, { each: true }),
    __metadata("design:type", Array)
], PermissionOverwrites.prototype, "deny", void 0);
class Bare {
}
class MessageBase extends MessageValidator {
}
class ModalBase extends ModalValidator {
    'custom-id';
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], ModalBase.prototype, "custom-id", void 0);
export class ActionArgumentsValidator extends applyActionArgumentFields(Bare) {
}
export class ActionArgumentsValidatorWithMessage extends applyActionArgumentFields(MessageBase) {
}
export class ActionArgumentsValidatorWithModal extends applyActionArgumentFields(ModalBase) {
}
export class FollowUpActionArgumentsValidator extends applyFollowUpFields(ActionArgumentsValidator) {
}
export class FollowUpActionArgumentsValidatorWithMessage extends applyFollowUpFields(ActionArgumentsValidatorWithMessage) {
}
export class FollowUpActionArgumentsValidatorWithModal extends applyFollowUpFields(ActionArgumentsValidatorWithModal) {
}
function applyActionArgumentFields(Base) {
    class Extended extends Base {
        every;
        cooldown;
        delay;
        chance;
    }
    __decorate([
        IsOptional(),
        IsInt(),
        IsPositive(),
        __metadata("design:type", Number)
    ], Extended.prototype, "every", void 0);
    __decorate([
        IsOptional(),
        IsInt(),
        IsPositive(),
        __metadata("design:type", Number)
    ], Extended.prototype, "cooldown", void 0);
    __decorate([
        IsOptional(),
        IsInt(),
        IsPositive(),
        __metadata("design:type", Number)
    ], Extended.prototype, "delay", void 0);
    __decorate([
        IsOptional(),
        IsInt(),
        Min(0),
        Max(100),
        __metadata("design:type", Number)
    ], Extended.prototype, "chance", void 0);
    ;
    return Extended;
}
function applyFollowUpFields(Base) {
    class Extended extends Base {
        actions;
        'follow-up-actions';
    }
    __decorate([
        IsOptional(),
        IsArray(),
        ValidateNested({ each: true }),
        Type(() => ActionValidator),
        __metadata("design:type", Array)
    ], Extended.prototype, "actions", void 0);
    __decorate([
        IsOptional(),
        IsArray(),
        ValidateNested({ each: true }),
        Type(() => ActionValidator),
        __metadata("design:type", Array)
    ], Extended.prototype, "follow-up-actions", void 0);
    ;
    return Extended;
}
export class ActionValidator {
    id;
    actions;
    args;
    conditions;
    mutators;
    target;
}
__decorate([
    IsOptional(),
    IsString(),
    Validate(IsValidActionId),
    __metadata("design:type", String)
], ActionValidator.prototype, "id", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => ActionValidator),
    __metadata("design:type", Array)
], ActionValidator.prototype, "actions", void 0);
__decorate([
    IsOptional(),
    Validate(IsValidActionArgs),
    __metadata("design:type", ActionArgumentsValidator)
], ActionValidator.prototype, "args", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => ConditionValidator),
    __metadata("design:type", Array)
], ActionValidator.prototype, "conditions", void 0);
__decorate([
    IsOptional(),
    ValidateNested(),
    Type(() => MutatorValidator),
    __metadata("design:type", MutatorValidator)
], ActionValidator.prototype, "mutators", void 0);
__decorate([
    IsOptional(),
    ValidateNested(),
    Type(() => TargetValidator),
    __metadata("design:type", TargetValidator)
], ActionValidator.prototype, "target", void 0);
export class TriggerActionValidator extends ActionValidator {
    triggers;
}
__decorate([
    IsDefined(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], TriggerActionValidator.prototype, "triggers", void 0);
