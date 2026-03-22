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
import { ValidateNested, IsOptional, IsDefined, IsArray } from 'class-validator';
import { TriggerActionValidator, ConditionValidator } from '../../../index.js';
export default class DefaultConfig {
    actions;
    conditions;
}
__decorate([
    IsDefined(),
    IsArray(),
    ValidateNested(),
    Type(() => TriggerActionValidator),
    __metadata("design:type", TriggerActionValidator)
], DefaultConfig.prototype, "actions", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => ConditionValidator),
    __metadata("design:type", Array)
], DefaultConfig.prototype, "conditions", void 0);
