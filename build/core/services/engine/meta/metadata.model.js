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
import { Table, Model, Column, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { MetaMode, MetaType } from './metaHandler.js';
let MetaData = class MetaData extends Model {
    async toggle(value) {
        if (this.type !== MetaType.BOOLEAN) {
            throw new Error('Meta type is not boolean');
        }
        this.value = value ? 'true' : 'false';
        await this.save();
    }
    async setValue(value) {
        this.value = Array.isArray(value) ? JSON.stringify(value) : String(value);
        await this.save();
    }
    async add(value) {
        if (this.type !== MetaType.NUMBER) {
            throw new Error('Meta type is not number');
        }
        const currentValue = parseFloat(this.value);
        this.value = String(currentValue + value);
        await this.save();
    }
    async subtract(value) {
        if (this.type !== MetaType.NUMBER) {
            throw new Error('Meta type is not number');
        }
        const currentValue = parseFloat(this.value);
        this.value = String(currentValue - value);
        await this.save();
    }
    async listAdd(value) {
        if (this.type !== MetaType.LIST) {
            throw new Error('Meta type is not list');
        }
        const currentValue = JSON.parse(this.value || '[]');
        if (!Array.isArray(currentValue)) {
            throw new Error('Current value is not an array');
        }
        currentValue.push(value);
        this.value = JSON.stringify(currentValue);
        await this.save();
    }
    async listRemove(value) {
        if (this.type !== MetaType.LIST) {
            throw new Error('Meta type is not list');
        }
        const currentValue = JSON.parse(this.value || '[]');
        if (!Array.isArray(currentValue)) {
            throw new Error('Current value is not an array');
        }
        const index = currentValue.indexOf(value);
        if (index > -1) {
            currentValue.splice(index, 1);
            this.value = JSON.stringify(currentValue);
            await this.save();
        }
    }
};
__decorate([
    PrimaryKey,
    AutoIncrement,
    Column({
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }),
    __metadata("design:type", Object)
], MetaData.prototype, "id", void 0);
__decorate([
    Column({
        type: DataTypes.STRING,
    }),
    __metadata("design:type", String)
], MetaData.prototype, "key", void 0);
__decorate([
    Column({
        type: DataTypes.STRING
    }),
    __metadata("design:type", String)
], MetaData.prototype, "scopeId", void 0);
__decorate([
    Column({
        type: DataTypes.ENUM,
        values: ["number", "string", "boolean", "list"]
    }),
    __metadata("design:type", String)
], MetaData.prototype, "type", void 0);
__decorate([
    Column({
        type: DataTypes.ENUM,
        values: ["user", "global", "channel", "message"]
    }),
    __metadata("design:type", String)
], MetaData.prototype, "mode", void 0);
__decorate([
    Column({
        type: DataTypes.STRING
    }),
    __metadata("design:type", String)
], MetaData.prototype, "value", void 0);
MetaData = __decorate([
    Table
], MetaData);
export { MetaData };
