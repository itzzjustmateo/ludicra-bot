import { manager, Utils } from "../../../index.js";
import { join, resolve } from 'path';
import * as fs from 'fs/promises';
import { parse } from 'yaml';
export class LangDirectory {
    langs = new Map();
    referenceLang;
    logger;
    absoluteFolderPath;
    defaultFolderPath;
    folderPath;
    constructor(logger, folderPath, defaultFolderPath, referenceLang) {
        this.logger = logger;
        this.folderPath = folderPath;
        this.referenceLang = referenceLang;
        this.absoluteFolderPath = join(resolve(), folderPath);
        this.defaultFolderPath = join(resolve(), defaultFolderPath);
    }
    async initialize() {
        if (!await Utils.fileExists(this.defaultFolderPath)) {
            throw [`Default language folder not found at ${this.defaultFolderPath}`];
        }
        // Create lang folder if it doesn't exist and copy default files
        if (!await Utils.fileExists(this.absoluteFolderPath)) {
            this.logger.warn(`Lang folder not found at ${this.folderPath}, creating one`);
            await fs.mkdir(this.absoluteFolderPath, { recursive: true });
            await fs.cp(this.defaultFolderPath, this.absoluteFolderPath, { recursive: true, force: true, filter: (src) => src.endsWith('.yml') });
        }
        await this.loadFiles();
    }
    async loadFiles() {
        if (!await Utils.fileExists(join(this.defaultFolderPath, this.referenceLang + '.yml'))) {
            throw [`Default language file not found at ${join(this.defaultFolderPath, this.referenceLang + '.yml')}`];
        }
        const referenceLangData = await this.loadLangFile(join(this.defaultFolderPath, this.referenceLang + '.yml'));
        const defaultFiles = await Array.fromAsync(fs.glob('*.yml', { cwd: this.defaultFolderPath }));
        const defaultLangs = new Map();
        await Promise.all(defaultFiles.map(async (file) => {
            const langCode = file.replace('.yml', '');
            if (!await Utils.fileExists(join(this.absoluteFolderPath, file))) {
                this.logger.warn(`Language file for '${langCode}' not found in lang directory, copying default file.`);
                await fs.copyFile(join(this.defaultFolderPath, file), join(this.absoluteFolderPath, file));
            }
            if (langCode === this.referenceLang) {
                defaultLangs.set(langCode, referenceLangData);
                return;
            }
            const langData = await this.loadLangFile(join(this.defaultFolderPath, file));
            const mergedLangData = new Map(referenceLangData);
            for (const [key, value] of langData) {
                mergedLangData.set(key, value);
            }
            defaultLangs.set(langCode, mergedLangData);
        }));
        const files = await Array.fromAsync(fs.glob('*.yml', { cwd: this.absoluteFolderPath }));
        await Promise.all(files.map(async (file) => {
            const langCode = file.replace('.yml', '');
            const langData = await this.loadLangFile(join(this.absoluteFolderPath, file));
            // Merge with default lang data to ensure all keys are present
            const mergedLangData = new Map(defaultLangs.get(langCode) || referenceLangData);
            for (const [key, value] of langData) {
                mergedLangData.set(key, value);
            }
            this.langs.set(langCode, mergedLangData);
        }));
    }
    async loadLangFile(filePath) {
        const fileContent = await fs.readFile(filePath, 'utf8');
        const parsedContent = parse(fileContent);
        const langData = new Map();
        flattenObject(parsedContent, '', langData);
        return langData;
    }
    getString(key, askedLanguage) {
        const lang = askedLanguage || manager.configs.config.getString('default-language');
        const langData = lang ? this.langs.get(lang) || this.langs.get(this.referenceLang) : this.langs.get(this.referenceLang);
        const message = langData.get(key);
        if (!message)
            throw `No language message found for key "${key}"` + (lang ? ` in file "${join(this.folderPath, lang + '.yml')}"` : "") + `.`;
        return message;
    }
    async getParsedString(key, variables, context, lang) {
        const message = this.getString(key, lang);
        return Utils.applyVariables(message, variables, context);
    }
    async buildMessage({ key, ephemeral, variables = [], context, lang }) {
        const parsedMessage = await this.getParsedString(key, variables, context, lang);
        variables.push({ name: 'message', value: parsedMessage });
        variables.push({ name: 'default_color', value: manager.configs.config.getString('default-color') });
        return Utils.setupMessage({
            config: manager.configs.config.getSubsection('default-message'),
            variables,
            context,
            ephemeral
        });
    }
}
function flattenObject(obj, parentKey = '', result = new Map()) {
    for (const key in obj) {
        const fullKey = parentKey ? `${parentKey}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            flattenObject(obj[key], fullKey, result);
        }
        else {
            result.set(fullKey, obj[key].toString());
        }
    }
    return result;
}
