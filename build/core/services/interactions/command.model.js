var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DataTypes } from 'sequelize';
import { Table, Model, Column } from 'sequelize-typescript';
let CommandModel = class CommandModel extends Model {
};
__decorate([
    Column({
        type: DataTypes.STRING,
        primaryKey: true
    }),
    __metadata("design:type", String)
], CommandModel.prototype, "id", void 0);
__decorate([
    Column({
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    }),
    __metadata("design:type", Object)
], CommandModel.prototype, "permission", void 0);
__decorate([
    Column({
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }),
    __metadata("design:type", Boolean)
], CommandModel.prototype, "enabled", void 0);
__decorate([
    Column({
        type: DataTypes.JSON,
        defaultValue: {}
    }),
    __metadata("design:type", Object)
], CommandModel.prototype, "data", void 0);
CommandModel = __decorate([
    Table
], CommandModel);
export { CommandModel };
