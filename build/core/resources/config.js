var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsActivityType, MessageValidator } from '../../index.js';
import { Type } from 'class-transformer';
import { IsString, IsInt, ValidateNested, IsBoolean, Validate, IsDefined, NotEquals, IsIn, IsPositive } from 'class-validator';
class Activity {
    text;
    type;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], Activity.prototype, "text", void 0);
__decorate([
    IsDefined(),
    IsString(),
    Validate(IsActivityType),
    __metadata("design:type", String)
], Activity.prototype, "type", void 0);
class Presence {
    interval;
    status;
    activities;
}
__decorate([
    IsDefined(),
    IsInt(),
    __metadata("design:type", Number)
], Presence.prototype, "interval", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], Presence.prototype, "status", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => Activity),
    __metadata("design:type", Array)
], Presence.prototype, "activities", void 0);
class Database {
    type;
    host;
    port;
    username;
    password;
    database;
    debug;
    'connect-timeout';
}
__decorate([
    IsDefined(),
    IsString(),
    IsIn(['mysql', 'sqlite', 'mariadb']),
    __metadata("design:type", String)
], Database.prototype, "type", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], Database.prototype, "host", void 0);
__decorate([
    IsDefined(),
    IsInt(),
    IsPositive(),
    __metadata("design:type", Number)
], Database.prototype, "port", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], Database.prototype, "username", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], Database.prototype, "password", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], Database.prototype, "database", void 0);
__decorate([
    IsDefined(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], Database.prototype, "debug", void 0);
__decorate([
    IsDefined(),
    IsInt(),
    IsPositive(),
    __metadata("design:type", Number)
], Database.prototype, "connect-timeout", void 0);
export default class DefaultConfig {
    token;
    'primary-guild';
    'default-language';
    'default-color';
    'default-message';
    debug;
    presence;
    database;
}
__decorate([
    IsDefined(),
    IsString(),
    NotEquals('BOT_TOKEN', {
        message: 'Please set your bot token in the configs/config.yml file.',
    }),
    __metadata("design:type", String)
], DefaultConfig.prototype, "token", void 0);
__decorate([
    IsDefined(),
    IsString(),
    NotEquals('GUILD_ID', {
        message: 'Please set your guild id in the configs/config.yml file.',
    }),
    __metadata("design:type", String)
], DefaultConfig.prototype, "primary-guild", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], DefaultConfig.prototype, "default-language", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], DefaultConfig.prototype, "default-color", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => MessageValidator),
    __metadata("design:type", MessageValidator)
], DefaultConfig.prototype, "default-message", void 0);
__decorate([
    IsDefined(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], DefaultConfig.prototype, "debug", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => Presence),
    __metadata("design:type", Presence)
], DefaultConfig.prototype, "presence", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => Database),
    __metadata("design:type", Database)
], DefaultConfig.prototype, "database", void 0);
