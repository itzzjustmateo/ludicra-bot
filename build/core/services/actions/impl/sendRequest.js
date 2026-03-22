var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Action, FollowUpActionArgumentsValidator, Utils } from '../../../../index.js';
import { IsDefined, IsOptional, IsString } from 'class-validator';
class ArgumentsValidator extends FollowUpActionArgumentsValidator {
    value;
    method;
    body;
    headers;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], ArgumentsValidator.prototype, "value", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ArgumentsValidator.prototype, "method", void 0);
__decorate([
    IsOptional(),
    __metadata("design:type", Object)
], ArgumentsValidator.prototype, "body", void 0);
__decorate([
    IsOptional(),
    __metadata("design:type", Object)
], ArgumentsValidator.prototype, "headers", void 0);
export default class SendRequestAction extends Action {
    id = "sendRequest";
    argumentsValidator = ArgumentsValidator;
    async onTrigger(script, context, variables) {
        const url = script.args.getString("value");
        const method = script.args.getStringOrNull("method") || "GET";
        const headers = await this.applyVariablesToObject(script.args.getObjectOrNull("headers"), variables, context);
        const body = await this.applyVariablesToObject(script.args.getObjectOrNull("body"), variables, context);
        const requestOptions = {
            method,
            headers,
            body,
        };
        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const contentType = response.headers.get("content-type");
            let data;
            if (contentType?.includes("application/json")) {
                data = await response.json();
                variables.push(...this.jsonToVariable(data));
            }
            else {
                data = await response.text();
                variables.push({ name: "data", value: data });
            }
            return this.triggerFollowUpActions(script, context, variables);
        }
        catch (error) {
            script.logger.error(`Error fetching data: ${error}`);
        }
    }
    jsonToVariable(json, path) {
        const variables = [];
        if (typeof json === "object" && json !== null) {
            for (const key in json) {
                const value = json[key];
                variables.push(...this.jsonToVariable(value, this.getPath(key, path)));
            }
        }
        else {
            variables.push({ name: `data_${path}`, value: json });
        }
        return variables;
    }
    getPath(key, path) {
        if (!path)
            return key;
        return `${path}_${key}`;
    }
    async applyVariablesToObject(obj, variables, context) {
        if (typeof obj === "object" && obj !== null && obj !== undefined) {
            for (const key in obj) {
                if (typeof obj[key] === "string") {
                    const value = await Utils.applyVariables(obj[key], variables, context);
                    obj[key] = value;
                }
                else {
                    const value = await this.applyVariablesToObject(obj[key], variables, context);
                    obj[key] = value;
                }
            }
        }
        return obj;
    }
}
