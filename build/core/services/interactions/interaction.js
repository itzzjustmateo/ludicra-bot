import { Base, CommandSubcommandBuilder, CommandSubcommandGroupBuilder } from '../../../index.js';
export class Command extends Base {
    data;
    enabled = true;
    constructor(manager, addon) {
        super(manager, addon);
        this.data = this.build();
        this.addLanguagesString();
    }
    async autocomplete(interaction) {
        throw new Error('Method not implemented.');
    }
    execute(interaction, user) {
        throw new Error('Method not implemented.');
    }
    addLanguagesString() {
        const lang = this.addon?.lang || this.manager.lang;
        if (!this.data.description) {
            this.data.setDescription(lang.getString(`commands.${this.data.name}.description`));
        }
        this.data.options.forEach(option => {
            this.addLanguagesStringOption(`commands.${this.data.name}`, option);
        });
    }
    addLanguagesStringOption(path, option) {
        const lang = this.addon?.lang || this.manager.lang;
        switch (true) {
            case option instanceof CommandSubcommandBuilder:
            case option instanceof CommandSubcommandGroupBuilder:
                if (!option.description) {
                    option.setDescription(lang.getString(`${path}.subcommands.${option.name}.description`));
                }
                option.options?.forEach(subOption => {
                    this.addLanguagesStringOption(`${path}.subcommands.${option.name}`, subOption);
                });
                break;
            default:
                if (!option.description) {
                    option.setDescription(lang.getString(`${path}.options.${option.name}`));
                }
                break;
        }
    }
}
export class ContextMenu extends Base {
    data;
    enabled = true;
    constructor(manager, addon) {
        super(manager, addon);
        this.data = this.build();
    }
    execute(interaction, user) {
        throw new Error('Method not implemented.');
    }
}
class BaseInteraction extends Base {
    usingPermissionFrom;
}
export class Button extends BaseInteraction {
}
export class SelectMenu extends BaseInteraction {
}
export class Modal extends BaseInteraction {
}
