import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Collection } from 'discord.js';
import { Command, ContextMenu, Service, Button, SelectMenu, Modal } from '../../../index.js';
import { CommandModel } from './command.model.js';
import { glob } from 'fs/promises';
/**
 * Service to manage interactions in the bot.
 */
export default class InteractionService extends Service {
    registries;
    constructor(manager) {
        super(manager);
        this.manager.database.addModels([CommandModel]);
        this.registries = {
            buttons: new Collection(),
            selectMenus: new Collection(),
            modals: new Collection(),
            commands: new Collection()
        };
    }
    async initialize() {
        await this.registerFromDir(join(dirname(fileURLToPath(import.meta.url)), 'impl'));
        this.manager.logger.info("Interaction service initialized.");
        await CommandModel.sync();
    }
    getCommand(name) {
        return this.registries.commands.get(name) || null;
    }
    getButton(customId) {
        return this.registries.buttons.get(customId) || null;
    }
    getSelectMenu(customId) {
        return this.registries.selectMenus.get(customId) || null;
    }
    getModal(customId) {
        return this.registries.modals.get(customId) || null;
    }
    async registerFromDir(interactionDir, addon = null) {
        const interactionFiles = await Array.fromAsync(glob(join(interactionDir, '**', '*.js').replace(/\\/g, '/')));
        await Promise.all(interactionFiles.map(async (filePath) => {
            const commandPath = new URL('file://' + filePath.replace(/\\/g, '/')).href;
            const { default: CommandInstance } = await import(commandPath);
            const instance = new CommandInstance(this.manager, addon);
            switch (true) {
                case instance instanceof Command:
                    this.registerCommand(instance);
                    break;
                case instance instanceof ContextMenu:
                    this.registerCommand(instance);
                    break;
                case instance instanceof Button:
                    this.registerButton(instance);
                    break;
                case instance instanceof SelectMenu:
                    this.registerSelectMenu(instance);
                    break;
                case instance instanceof Modal:
                    this.registerModal(instance);
                    break;
                default:
                    this.manager.logger.warn(`Unknown interaction type for instance from file: ${filePath}`);
            }
        }));
    }
    registerCommand(command) {
        try {
            if (!command.data)
                throw new Error("Command needs a data object.");
            if (this.registries.commands.has(command.data.name))
                throw new Error("Command already exists.");
            this.registries.commands.set(command.data.name, command);
        }
        catch (error) {
            command.logger.error(`Error initializing command '${command.data.name}'`, error);
        }
    }
    registerButton(button) {
        try {
            if (!button.customId)
                throw new Error("Button needs a customId.");
            if (this.registries.buttons.has(button.customId))
                throw new Error("Button already exists.");
            this.registries.buttons.set(button.customId, button);
        }
        catch (error) {
            button.logger.error(`Error initializing button '${button.customId}'`, error);
        }
    }
    registerSelectMenu(selectMenu) {
        try {
            if (!selectMenu.customId)
                throw new Error("SelectMenu needs a customId.");
            if (this.registries.selectMenus.has(selectMenu.customId))
                throw new Error("SelectMenu already exists.");
            this.registries.selectMenus.set(selectMenu.customId, selectMenu);
        }
        catch (error) {
            selectMenu.logger.error(`Error initializing selectMenu '${selectMenu.customId}'`, error);
        }
    }
    unregisterByAddon(addon) {
        for (const [customId, button] of this.registries.buttons) {
            if (button.addon === addon) {
                this.registries.buttons.delete(customId);
            }
        }
        for (const [customId, selectMenu] of this.registries.selectMenus) {
            if (selectMenu.addon === addon) {
                this.registries.selectMenus.delete(customId);
            }
        }
        for (const [customId, modal] of this.registries.modals) {
            if (modal.addon === addon) {
                this.registries.modals.delete(customId);
            }
        }
        for (const [name, command] of this.registries.commands) {
            if (command.addon === addon) {
                this.registries.commands.delete(name);
            }
        }
    }
    resolveInteraction(interaction) {
        if (interaction.isChatInputCommand() || interaction.isAutocomplete() || interaction.isContextMenuCommand()) {
            return this.getCommand(interaction.commandName) || undefined;
        }
        if (interaction.isButton()) {
            return this.getButton(interaction.customId) || undefined;
        }
        if (interaction.isAnySelectMenu()) {
            return this.getSelectMenu(interaction.customId) || undefined;
        }
        if (interaction.isModalSubmit()) {
            return this.getModal(interaction.customId) || undefined;
        }
        return undefined;
    }
    registerModal(modal) {
        try {
            if (!modal.customId)
                throw new Error("Modal needs a customId.");
            if (this.registries.modals.has(modal.customId))
                throw new Error("Modal already exists.");
            this.registries.modals.set(modal.customId, modal);
        }
        catch (error) {
            modal.logger.error(`Error initializing modal '${modal.customId}'`, error);
        }
    }
    async deployCommands() {
        const commands = await CommandModel.findAll();
        let update = false;
        const commandsToUpdate = [];
        for (const command of this.registries.commands.values()) {
            const existingCommand = commands.find(cmd => cmd.id === command.data.name);
            if (existingCommand) {
                if (existingCommand.permission) {
                    command.data.setDefaultMemberPermissions(existingCommand.permission);
                }
                if (existingCommand.data !== command.data.toJSON()) {
                    existingCommand.data = command.data.toJSON();
                    await existingCommand.save({ fields: ['data'] });
                    update = true;
                }
                if (existingCommand.enabled) {
                    commandsToUpdate.push(command.data);
                }
                else {
                    command.enabled = false;
                }
            }
            else {
                update = true;
                commandsToUpdate.push(command.data);
                await CommandModel.create({
                    id: command.data.name,
                    data: command.data.toJSON(),
                    permission: command.data.default_member_permissions,
                    enabled: true
                });
            }
        }
        if (!update)
            return;
        try {
            if (commandsToUpdate)
                await this.manager.client.application.commands.set(commandsToUpdate, this.manager.primaryGuildId);
        }
        catch (error) {
            this.manager.logger.error(`Error syncing commands to Discord: ${error.message}`, error);
        }
    }
    async updateDiscordCommand(command) {
        try {
            const guild = await this.manager.client.guilds.fetch(this.manager.primaryGuildId);
            if (guild) {
                const discordCommand = await guild.commands.fetch().then(cmds => cmds.find(cmd => cmd.name === command.data.name));
                if (!discordCommand)
                    return;
                await guild.commands.edit(discordCommand.id, command.data);
            }
        }
        catch (error) {
            this.manager.logger.error(`Error updating command '${command.data.name}': ${error.message}`, error);
        }
    }
    async addDiscordCommand(command) {
        try {
            const guild = await this.manager.client.guilds.fetch(this.manager.primaryGuildId);
            if (guild) {
                await guild.commands.create(command.data);
            }
        }
        catch (error) {
            this.manager.logger.error(`Error adding command '${command.data.name}': ${error.message}`, error);
        }
    }
    async removeDiscordCommand(command) {
        try {
            const guild = await this.manager.client.guilds.fetch(this.manager.primaryGuildId);
            if (guild) {
                const discordCommand = await guild.commands.fetch().then(cmds => cmds.find(cmd => cmd.name === command.data.name));
                if (!discordCommand)
                    return;
                await guild.commands.delete(discordCommand.id);
            }
        }
        catch (error) {
            this.manager.logger.error(`Error removing command '${command.data.name}': ${error.message}`, error);
        }
    }
}
