import { Utils } from '../../../index.js';
import * as fs from 'fs/promises';
import { join, resolve } from 'path';
import { Collection } from 'discord.js';
import { ConfigFile } from './configFile.js';
/**
 * Class representing a folder of configuration files.
 */
export class ConfigFolder {
    logger;
    /** Collection of configuration files */
    configs = new Collection();
    /** Relative path to the config folder */
    folderPath;
    /** Absolute path to the config folder */
    absoluteFolderPath;
    /** Absolute path to the default config folder */
    defaultFolderPath;
    constructor(logger, folderPath, defaultFolderPath) {
        this.logger = logger;
        this.folderPath = folderPath;
        this.absoluteFolderPath = join(resolve(), folderPath);
        this.defaultFolderPath = join(resolve(), defaultFolderPath);
    }
    /**
     * Initialize the config folder.
     * @param configClass The config class to use for initialization.
     * @return The collection of configuration files.
     */
    async initialize(configClass) {
        // Check if default folder exists
        if (!await Utils.fileExists(this.defaultFolderPath)) {
            throw [`Default folder not found at ${this.defaultFolderPath}`];
        }
        // Create config folder if it doesn't exist and copy default files
        if (!await Utils.fileExists(this.absoluteFolderPath)) {
            this.logger.warn(`Config folder not found at ${this.folderPath}, creating one`);
            await fs.mkdir(this.absoluteFolderPath, { recursive: true });
            await fs.cp(this.defaultFolderPath, this.absoluteFolderPath, { recursive: true, force: true });
        }
        await this.loadFiles(configClass);
        return this.configs;
    }
    /**
     * Load all config files in the folder
     */
    async loadFiles(configClass) {
        // Find all .yml files in the config folder, ignoring those starting with '_'
        const files = await Array.fromAsync(fs.glob('**/*.yml', { cwd: this.absoluteFolderPath }));
        // Load each config file
        await Promise.all(files.map(async (file) => {
            if (file.startsWith('_'))
                return;
            const destPath = join(this.folderPath, file);
            const id = file.slice(0, -4);
            const config = await new ConfigFile(this.logger, destPath, id).initialize(configClass);
            this.configs.set(config.id, config);
        }));
    }
}
