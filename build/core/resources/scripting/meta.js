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
import { ValidateNested, IsOptional, IsDefined, IsArray, IsString, NotContains, IsIn, IsBoolean, Validate } from 'class-validator';
import { IsNumberAndUserMeta } from '../../../index.js';
class LeaderboardConfig {
    enabled;
    name;
    description;
    format;
}
__decorate([
    IsDefined(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], LeaderboardConfig.prototype, "enabled", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], LeaderboardConfig.prototype, "name", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], LeaderboardConfig.prototype, "description", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], LeaderboardConfig.prototype, "format", void 0);
class Meta {
    key;
    type;
    default;
    mode;
    leaderboard;
}
__decorate([
    IsDefined(),
    IsString(),
    NotContains('_'),
    __metadata("design:type", String)
], Meta.prototype, "key", void 0);
__decorate([
    IsDefined(),
    IsString(),
    IsIn(['string', 'number', 'boolean', 'list']),
    __metadata("design:type", String)
], Meta.prototype, "type", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], Meta.prototype, "default", void 0);
__decorate([
    IsOptional(),
    IsString(),
    IsIn(['global', 'user', 'channel', 'message']),
    __metadata("design:type", String)
], Meta.prototype, "mode", void 0);
__decorate([
    IsOptional(),
    Validate(IsNumberAndUserMeta),
    ValidateNested(),
    Type(() => LeaderboardConfig),
    __metadata("design:type", LeaderboardConfig)
], Meta.prototype, "leaderboard", void 0);
export default class DefaultConfig {
    metas;
}
__decorate([
    IsDefined(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => Meta),
    __metadata("design:type", Array)
], DefaultConfig.prototype, "metas", void 0);
