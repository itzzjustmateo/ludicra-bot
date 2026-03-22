export * from './context.js';
export * from './events.js';
export * from './manager.js';
export * from './decorators/validator.js';
export * from './config/configFile.js';
export * from './config/configFolder.js';
export * from './config/config.js';
export * from './config/langDirectory.js';
export * from './validators/command.js';
export * from './validators/component.js';
export * from './validators/scripting.js';
export class Base {
    manager;
    addon;
    logger;
    constructor(manager, addon) {
        this.manager = manager;
        this.addon = addon;
        this.logger = addon ? addon.logger : manager.logger;
    }
}
export class Service {
    manager;
    constructor(manager) {
        this.manager = manager;
    }
}
