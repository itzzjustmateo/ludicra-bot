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
import { IsString, ValidateNested, IsOptional, IsDefined, IsArray, IsBoolean, IsNumber, Validate } from 'class-validator';
import { CommandValidator, ActionValidator, IsChannelType, IsCommandOptionType } from '../../../index.js';
class ChoiceOptionValidator {
    name;
    value;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], ChoiceOptionValidator.prototype, "name", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], ChoiceOptionValidator.prototype, "value", void 0);
class CommandOptionValidator {
    name;
    description;
    type;
    required;
    'max-length';
    'min-length';
    'min-value';
    'max-value';
    'channel-type';
    choices;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], CommandOptionValidator.prototype, "name", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], CommandOptionValidator.prototype, "description", void 0);
__decorate([
    IsDefined(),
    IsString(),
    Validate(IsCommandOptionType),
    __metadata("design:type", String)
], CommandOptionValidator.prototype, "type", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CommandOptionValidator.prototype, "required", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], CommandOptionValidator.prototype, "max-length", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], CommandOptionValidator.prototype, "min-length", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], CommandOptionValidator.prototype, "min-value", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], CommandOptionValidator.prototype, "max-value", void 0);
__decorate([
    IsOptional(),
    IsString(),
    Validate(IsChannelType),
    __metadata("design:type", String)
], CommandOptionValidator.prototype, "channel-type", void 0);
__decorate([
    IsOptional(),
    ValidateNested({ each: true }),
    IsArray(),
    Type(() => ChoiceOptionValidator),
    __metadata("design:type", Array)
], CommandOptionValidator.prototype, "choices", void 0);
export default class DefaultConfig extends CommandValidator {
    name;
    description;
    options;
    actions;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], DefaultConfig.prototype, "name", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], DefaultConfig.prototype, "description", void 0);
__decorate([
    IsOptional(),
    ValidateNested({ each: true }),
    IsArray(),
    Type(() => CommandOptionValidator),
    __metadata("design:type", Array)
], DefaultConfig.prototype, "options", void 0);
__decorate([
    IsDefined(),
    IsArray(),
    ValidateNested(),
    Type(() => ActionValidator),
    __metadata("design:type", ActionValidator)
], DefaultConfig.prototype, "actions", void 0);
