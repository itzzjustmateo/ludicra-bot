var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { userMention } from 'discord.js';
import { DataTypes } from 'sequelize';
import { Table, Model, Column } from 'sequelize-typescript';
let User = class User extends Model {
    get mention() {
        return userMention(this.id);
    }
    async addCoins(amount) {
        this.coins += amount;
        await this.save();
    }
    async removeCoins(amount) {
        if (this.coins >= amount) {
            this.coins -= amount;
            await this.save();
        }
        else {
            throw new Error("Insufficient coins");
        }
    }
    async setCoins(amount) {
        this.coins = amount;
        await this.save();
    }
    hasCoins(amount) {
        return this.coins >= amount;
    }
};
__decorate([
    Column({
        type: DataTypes.STRING,
        primaryKey: true
    }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    Column({
        type: DataTypes.STRING
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    Column({
        type: DataTypes.STRING
    }),
    __metadata("design:type", String)
], User.prototype, "displayName", void 0);
__decorate([
    Column({
        type: DataTypes.STRING
    }),
    __metadata("design:type", Object)
], User.prototype, "avatar", void 0);
__decorate([
    Column({
        type: DataTypes.INTEGER
    }),
    __metadata("design:type", Number)
], User.prototype, "createdAt", void 0);
__decorate([
    Column({
        type: DataTypes.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], User.prototype, "joinedAt", void 0);
__decorate([
    Column({
        type: DataTypes.JSON
    }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    Column({
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isBot", void 0);
__decorate([
    Column({
        type: DataTypes.INTEGER,
        defaultValue: 0
    }),
    __metadata("design:type", Object)
], User.prototype, "coins", void 0);
__decorate([
    Column({
        type: DataTypes.INTEGER,
        defaultValue: 0
    }),
    __metadata("design:type", Object)
], User.prototype, "messages", void 0);
User = __decorate([
    Table
], User);
export { User };
