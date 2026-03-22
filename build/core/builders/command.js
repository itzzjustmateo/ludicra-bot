import { ContextMenuCommandBuilder, SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder, Collection } from 'discord.js';
export class CommandSubcommandBuilder extends SlashCommandSubcommandBuilder {
    execute;
    setExecute(execute) {
        this.execute = execute;
        return this;
    }
    addStringOption(input) {
        super.addStringOption(input);
        return this;
    }
    addAttachmentOption(input) {
        super.addAttachmentOption(input);
        return this;
    }
    addChannelOption(input) {
        super.addChannelOption(input);
        return this;
    }
    addBooleanOption(input) {
        super.addBooleanOption(input);
        return this;
    }
    addIntegerOption(input) {
        super.addIntegerOption(input);
        return this;
    }
    addMentionableOption(input) {
        super.addMentionableOption(input);
        return this;
    }
    addNumberOption(input) {
        super.addNumberOption(input);
        return this;
    }
    addRoleOption(input) {
        super.addRoleOption(input);
        return this;
    }
    addUserOption(input) {
        super.addUserOption(input);
        return this;
    }
}
export class CommandSubcommandGroupBuilder extends SlashCommandSubcommandGroupBuilder {
    executes = new Collection();
    execute;
    setExecute(execute) {
        this.execute = execute;
        return this;
    }
    addSubcommand(input) {
        const builder = typeof input === "function"
            ? input(new CommandSubcommandBuilder())
            : input;
        if (builder.execute) {
            this.executes.set(`${this.name}.${builder.name}`, builder.execute);
            builder.execute = undefined;
        }
        super.addSubcommand(builder);
        return this;
    }
}
export class CommandBuilder extends SlashCommandBuilder {
    public = false;
    executes = new Collection();
    addSubcommand(input) {
        const builder = typeof input === "function"
            ? input(new CommandSubcommandBuilder())
            : input;
        if (builder.execute) {
            this.executes.set(builder.name, builder.execute);
            builder.execute = undefined;
        }
        super.addSubcommand(builder);
        return this;
    }
    addSubcommandGroup(input) {
        const builder = typeof input === "function"
            ? input(new CommandSubcommandGroupBuilder())
            : input;
        if (builder.execute) {
            this.executes.set(builder.name, builder.execute);
            builder.execute = undefined;
        }
        for (const [key, subcommand] of builder.executes) {
            this.executes.set(key, subcommand);
        }
        builder.executes.clear();
        super.addSubcommandGroup(builder);
        return this;
    }
    setPublic() {
        this.public = true;
        return this;
    }
    addStringOption(input) {
        super.addStringOption(input);
        return this;
    }
    addAttachmentOption(input) {
        super.addAttachmentOption(input);
        return this;
    }
    addChannelOption(input) {
        super.addChannelOption(input);
        return this;
    }
    addBooleanOption(input) {
        super.addBooleanOption(input);
        return this;
    }
    addIntegerOption(input) {
        super.addIntegerOption(input);
        return this;
    }
    addMentionableOption(input) {
        super.addMentionableOption(input);
        return this;
    }
    addNumberOption(input) {
        super.addNumberOption(input);
        return this;
    }
    addRoleOption(input) {
        super.addRoleOption(input);
        return this;
    }
    addUserOption(input) {
        super.addUserOption(input);
        return this;
    }
}
export class ContextMenuBuilder extends ContextMenuCommandBuilder {
}
