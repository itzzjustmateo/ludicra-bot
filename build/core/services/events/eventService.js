import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Event } from '../../../index.js';
import { Collection } from 'discord.js';
import { Service } from '../../contracts/index.js';
import { glob } from 'fs/promises';
/**
 * Service to manage events in the bot.
 */
export default class EventService extends Service {
    events;
    constructor(manager) {
        super(manager);
        this.events = new Collection();
    }
    async initialize() {
        this.manager.logger.info("Event service initialized.");
        await this.registerFromDir(join(dirname(fileURLToPath(import.meta.url)), 'impl'));
    }
    async registerFromDir(eventsDir, addon = undefined) {
        const eventFiles = await Array.fromAsync(glob(join(eventsDir, '**', '*.js').replace(/\\/g, '/')));
        await Promise.all(eventFiles.map(async (filePath) => {
            const eventPath = new URL('file://' + filePath.replace(/\\/g, '/')).href;
            const { default: event } = await import(eventPath);
            this.registerEvent(new event(this.manager, addon));
        }));
    }
    registerEvent(event) {
        try {
            if (!this.events.has(event.name)) {
                this.events.set(event.name, new EventExecutor(event.once || false));
            }
            this.events.get(event.name)?.addEvent(event);
        }
        catch (error) {
            event.logger.error(`Error initializing event '${Event.name}'`, error);
        }
    }
    unregisterByAddon(addon) {
        for (const [name, executor] of this.events) {
            executor.events = executor.events.filter(e => e.addon !== addon);
            if (executor.events.length === 0) {
                this.events.delete(name);
            }
        }
    }
    initializeEvents() {
        for (const [name, executor] of this.events) {
            if (executor.once) {
                this.manager.client.once(name, (...args) => {
                    executor.run(...args);
                });
            }
            else {
                this.manager.client.on(name, (...args) => {
                    executor.run(...args);
                });
            }
        }
    }
}
export class EventExecutor {
    events = [];
    once;
    constructor(once = false) {
        this.once = once;
    }
    addEvent(event) {
        this.events.push(event);
        this.events.sort((a, b) => a.priority - b.priority);
    }
    async run(...args) {
        let i = 0;
        while (i < this.events.length) {
            const event = this.events[i];
            try {
                if (event.every > 1 && event.current < event.every) {
                    event.current++;
                }
                else {
                    event.current = 1;
                    await event.execute(...args);
                    if (event.canceled === true) {
                        event.canceled = false;
                        break;
                    }
                }
            }
            catch (error) {
                if (event.canceled === true) {
                    event.canceled = false;
                    break;
                }
                event.logger.error(`Error executing event '${event.name}'`, error);
            }
            i++;
        }
    }
}
