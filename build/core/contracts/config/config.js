import { Utils } from '../../../index.js';
import * as fs from 'fs/promises';
import { parseDocument } from 'yaml';
/**
 * Base class for configuration management.
 * Provides methods to get, set, and manage configuration values with type safety.
 */
export class Config {
    logger;
    /** Map to hold the config values */
    values;
    /** Current path within the config, if any. */
    currentPath;
    /** Path to the file where this config was loaded from, if any. */
    filePath;
    constructor(logger, filePath = undefined, currentPath = undefined) {
        this.values = new Map();
        this.logger = logger;
        this.currentPath = currentPath;
        this.filePath = filePath;
    }
    /**
     * Initialize the config with values from an object.
     * This will clear any existing values in the config.
     * @param values The object containing the config values.
     */
    init(values) {
        this.values.clear();
        // Normalize and set the values
        for (const [key, value] of Object.entries(values)) {
            if (value == null)
                continue;
            // Constrain and set the value
            this.values.set(key, this.constrainConfigTypes(value, key));
        }
    }
    /**
     * Check if a config value exists at the specified path.
     * @param path The path to check.
     * @returns True if the value exists, false otherwise.
     */
    has(path) {
        return this.getOrNull(path) !== undefined;
    }
    /**
     * Get a config value at the specified path, or null if it doesn't exist.
     * @param path The path to get the value from.
     * @returns The config value, or null if it doesn't exist.
     */
    getOrNull(path) {
        const parts = path.split('.');
        let current = this;
        for (const part of parts) {
            if (!(current instanceof Config))
                return undefined;
            current = current.values.get(part);
        }
        return current;
    }
    /**
     * Get a config value at the specified path.
     * Throws an error if the value doesn't exist.
     * @param path The path to get the value from.
     * @returns The config value.
     */
    get(path) {
        const value = this.getOrNull(path);
        if (TypeCheckers.isNullOrUndefined(value)) {
            throw `No config value found for "${this.getPath(path)}"` + (this.filePath ? ` in file ${this.filePath}` : "");
        }
        return value;
    }
    /**
     * Get a string value at the specified path.
     * If randomize is true and the value is an array, a random item from the array will be returned.
     * @param path The path to get the string from.
     * @param randomize Whether to return a random item if the value is an array.
     * @returns The string value.
     */
    getString(path, randomize = false) {
        const value = this.get(path);
        if (TypeCheckers.isString(value))
            return value;
        if (TypeCheckers.isStringArray(value) && randomize) {
            return Utils.getRandom(value);
        }
        if (TypeCheckers.isBoolean(value))
            return value.toString();
        if (TypeCheckers.isNumber(value))
            return value.toString();
        throw this.logger.error(`Expected string at path "${path}"`);
    }
    /**
     * Get a string value at the specified path, or undefined if it doesn't exist.
     * @param path The path to get the string from.
     * @param randomize Whether to return a random item if the value is an array.
     * @returns The string value, or undefined if it doesn't exist.
     */
    getStringOrNull(path, randomize = false) {
        const value = this.getOrNull(path);
        if (TypeCheckers.isNullOrUndefined(value))
            return undefined;
        if (TypeCheckers.isString(value))
            return value;
        if (TypeCheckers.isStringArray(value) && randomize) {
            return Utils.getRandom(value);
        }
        if (TypeCheckers.isBoolean(value))
            return value.toString();
        if (TypeCheckers.isNumber(value))
            return value.toString();
        return undefined;
    }
    /**
     * Get a string array at the specified path.
     * If the value is a string, it will be returned as a single-item array.
     * @param path The path to get the string array from.
     * @returns The string array.
     */
    getStrings(path) {
        const value = this.get(path);
        if (TypeCheckers.isStringArray(value))
            return value;
        if (TypeCheckers.isString(value))
            return [value];
        throw this.logger.error(`Expected string array at path "${path}"`);
    }
    /**
     * Get a string array at the specified path, or undefined if it doesn't exist.
     * @param path The path to get the string array from.
     * @returns The string array, or undefined if it doesn't exist.
     */
    getStringsOrNull(path) {
        const value = this.getOrNull(path);
        if (TypeCheckers.isNullOrUndefined(value))
            return undefined;
        if (TypeCheckers.isStringArray(value))
            return value;
        if (TypeCheckers.isString(value))
            return [value];
        return undefined;
    }
    /**
     * Get a boolean value at the specified path.
     * @param path The path to get the boolean from.
     * @returns The boolean value.
     */
    getBool(path) {
        const value = this.get(path);
        if (TypeCheckers.isBoolean(value))
            return value;
        throw this.logger.error(`Expected boolean at path "${path}"`);
    }
    /**
     * Get a boolean value at the specified path, or undefined if it doesn't exist.
     * @param path The path to get the boolean from.
     * @returns The boolean value, or undefined if it doesn't exist.
     */
    getBoolOrNull(path) {
        const value = this.getOrNull(path);
        if (TypeCheckers.isNullOrUndefined(value))
            return undefined;
        if (TypeCheckers.isBoolean(value))
            return value;
        return undefined;
    }
    /**
     * Get a number value at the specified path.
     * If randomize is true and the value is an array, a random item from the array will be returned.
     * @param path The path to get the number from.
     * @param randomize Whether to return a random item if the value is an array.
     * @returns The number value.
     */
    getNumber(path, randomize = false) {
        const value = this.get(path);
        if (TypeCheckers.isNumber(value))
            return value;
        if (TypeCheckers.isNumberArray(value) && randomize) {
            return Utils.getRandom(value);
        }
        throw this.logger.error(`Expected number at path "${path}"`);
    }
    /**
     * Get a number value at the specified path, or undefined if it doesn't exist.
     * If randomize is true and the value is an array, a random item from the array will be returned.
     * @param path The path to get the number from.
     * @param randomize Whether to return a random item if the value is an array.
     * @returns The number value, or undefined if it doesn't exist.
     */
    getNumberOrNull(path, randomize = false) {
        const value = this.getOrNull(path);
        if (TypeCheckers.isNullOrUndefined(value))
            return undefined;
        if (TypeCheckers.isNumber(value))
            return value;
        if (TypeCheckers.isNumberArray(value) && randomize) {
            return Utils.getRandom(value);
        }
        return undefined;
    }
    /**
     * Get a number array at the specified path.
     * If the value is a number, it will be returned as a single-item array.
     * @param path The path to get the number array from.
     * @returns The number array.
     */
    getNumbers(path) {
        const value = this.get(path);
        if (TypeCheckers.isNumberArray(value))
            return value;
        if (TypeCheckers.isNumber(value))
            return [value];
        throw this.logger.error(`Expected number array at path "${path}"`);
    }
    /**
     * Get a number array at the specified path, or undefined if it doesn't exist.
     * @param path The path to get the number array from.
     * @returns The number array, or undefined if it doesn't exist.
     */
    getNumbersOrNull(path) {
        const value = this.getOrNull(path);
        if (TypeCheckers.isNullOrUndefined(value))
            return undefined;
        if (TypeCheckers.isNumberArray(value))
            return value;
        if (TypeCheckers.isNumber(value))
            return [value];
        return undefined;
    }
    /**
     * Get a subsection (Config) at the specified path.
     * If randomize is true and the value is an array, a random item from the array will be returned.
     * @param path The path to get the subsection from.
     * @param randomize Whether to return a random item if the value is an array.
     * @returns The subsection (Config).
     */
    getSubsection(path, randomize = false) {
        const value = this.get(path);
        if (TypeCheckers.isConfig(value))
            return value;
        if (TypeCheckers.isConfigArray(value) && randomize) {
            return Utils.getRandom(value);
        }
        throw this.logger.error(`Expected subsection at path "${path}"`);
    }
    /**
     * Get a subsection (Config) at the specified path, or undefined if it doesn't exist.
     * If randomize is true and the value is an array, a random item from the array will be returned.
     * @param path The path to get the subsection from.
     * @param randomize Whether to return a random item if the value is an array.
     * @returns The subsection (Config), or undefined if it doesn't exist.
     */
    getSubsectionOrNull(path, randomize = false) {
        const value = this.getOrNull(path);
        if (TypeCheckers.isNullOrUndefined(value))
            return undefined;
        if (TypeCheckers.isConfig(value))
            return value;
        if (TypeCheckers.isConfigArray(value) && randomize) {
            return Utils.getRandom(value);
        }
        return undefined;
    }
    /**
     * Get an array of subsections (Config) at the specified path.
     * If the value is a single subsection, it will be returned as a single-item array.
     * @param path The path to get the subsections from.
     * @returns The array of subsections (Config).
     */
    getSubsections(path) {
        const value = this.get(path);
        if (TypeCheckers.isConfigArray(value))
            return value;
        if (TypeCheckers.isConfig(value))
            return [value];
        throw this.logger.error(`Expected subsection array at path "${path}"`);
    }
    /**
     * Get an array of subsections (Config) at the specified path, or undefined if it doesn't exist.
     * If the value is a single subsection, it will be returned as a single-item array.
     * @param path The path to get the subsections from.
     * @returns The array of subsections (Config), or undefined if it doesn't exist.
     */
    getSubsectionsOrNull(path) {
        const value = this.getOrNull(path);
        if (TypeCheckers.isNullOrUndefined(value))
            return undefined;
        if (TypeCheckers.isConfigArray(value))
            return value;
        if (TypeCheckers.isConfig(value))
            return [value];
        return undefined;
    }
    /**
     * Get an object at the specified path.
     * @param path The path to get the object from.
     * @returns The object.
     */
    getObject(path) {
        const value = this.get(path);
        if (TypeCheckers.isConfig(value))
            return value.toJSON();
        throw this.logger.error(`Expected object at path "${path}"`);
    }
    /**
     * Get an object at the specified path, or undefined if it doesn't exist.
     * @param path The path to get the object from.
     * @returns The object, or undefined if it doesn't exist.
     */
    getObjectOrNull(path) {
        const value = this.getOrNull(path);
        if (TypeCheckers.isNullOrUndefined(value))
            return undefined;
        if (TypeCheckers.isConfig(value))
            return value.toJSON();
        return undefined;
    }
    /**
     * Set a config value at the specified path.
     * If the path includes dots, it will create or navigate through subsections as needed.
     * @param path The path where the value should be set.
     * @param obj The value to set. If null or undefined, the value at the path will be deleted.
     */
    set(path, obj) {
        const pathParts = path.split('.');
        const nearestPath = pathParts[0];
        // If there are more parts, we need to navigate or create subsections
        if (pathParts.length > 1) {
            const remainingPath = pathParts.slice(1).join('.');
            // Get or create the nearest subsection
            let section = this.getSubsectionOrNull(nearestPath);
            if (!section) {
                // Create a new subsection if it doesn't exist
                section = this.newConfig(nearestPath, {});
                this.values.set(nearestPath, section);
            }
            // Recursively set the value in the subsection
            section.set(remainingPath, obj);
            return;
        }
        // If obj is null or undefined, delete the value
        if (TypeCheckers.isNullOrUndefined(obj)) {
            this.values.delete(nearestPath);
        }
        else {
            // Constrain and set the value
            const constrained = this.constrainConfigTypes(obj);
            this.values.set(nearestPath, constrained);
        }
    }
    /**
     * Set a config value at the specified path and save it to the file.
     * If the path includes dots, it will create or navigate through subsections as needed.
     * @param path The path where the value should be set.
     * @param obj The value to set. If null or undefined, the value at the path will be deleted.
     * @returns True if the file was saved successfully, false otherwise.
     */
    async setFileContent(path, obj) {
        if (!this.filePath)
            return false;
        const fullPath = this.getPath(path);
        // Read the existing file content
        const file = parseDocument(await fs.readFile(this.filePath, 'utf8'));
        // Split the path into segments, handling array indices
        const pathSegments = fullPath.split('.').flatMap(segment => {
            return segment
                .split(/[\[\]]/) // split by [ or ]
                .filter(Boolean) // remove empty strings
                .map(s => (/^\d+$/.test(s) ? Number(s) : s)); // transform to number if it's an index
        });
        // Set the value in the YAML document
        file.setIn(pathSegments, obj);
        // Update the in-memory config as well
        this.set(path, obj);
        // Write the updated content back to the file
        await fs.writeFile(this.filePath, file.toString(), 'utf8');
        return true;
    }
    /**
     * Constrain the types of the config values to string, number, boolean, Config, or arrays of these types.
     * @param value The value to constrain.
     * @param path The current path in the config for error reporting.
     * @returns The constrained config value.
     */
    constrainConfigTypes(value, path = '') {
        // If the value is an array, process each item recursively
        if (Array.isArray(value)) {
            if (!value.length)
                return [];
            return value.map((item, index) => {
                return this.constrainConfigTypes(item, `${path}[${index}]`);
            });
        }
        // If the value is an object, convert it to a Config instance
        if (typeof value === 'object' && value !== null) {
            return this.newConfig(path, value);
        }
        // If the value is a number, round it to two decimal places if it's not an integer
        if (typeof value === 'number' && !Number.isInteger(value)) {
            return Math.round(value * 100) / 100;
        }
        // If the value is a primitive type, return it as is
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            return value;
        }
        throw new Error(`Unsupported config value type: ${typeof value}`);
    }
    /**
     * Convert the config to a JSON object.
     * @returns The JSON representation of the config.
     */
    toJSON() {
        const obj = {};
        // Recursively convert Config values to plain objects
        for (const [key, value] of this.values) {
            obj[key] = this.toJSONValue(value);
        }
        return obj;
    }
    /**
     * Convert a config value to a JSON-compatible value.
     * @param value The config value to convert.
     * @returns The JSON-compatible value.
     */
    toJSONValue(value) {
        if (TypeCheckers.isConfig(value)) {
            // If the value is a Config, convert it to JSON
            return value.toJSON();
        }
        else if (Array.isArray(value)) {
            // If the value is an array, process each item recursively
            return value.map((item) => this.toJSONValue(item));
        }
        else {
            // If the value is a primitive type, return it as is
            return value;
        }
    }
    /**
     * Get the full path for a given sub-path.
     * @param path The sub-path.
     * @returns The full path.
     */
    getPath(path) {
        return this.currentPath ? `${this.currentPath}.${path}` : path;
    }
    /**
     * Create a new Config instance.
     * @param path The path for the new config.
     * @param values Optional initial values for the new config.
     * @returns The new Config instance.
     */
    newConfig(path, values) {
        if (!path)
            return new Config(this.logger, this.filePath);
        const newConfig = new Config(this.logger, this.filePath, this.getPath(path));
        if (values)
            newConfig.init(values);
        return newConfig;
    }
}
// Utility type checkers
class TypeCheckers {
    static isString(value) {
        return typeof value === 'string';
    }
    static isStringArray(value) {
        return Array.isArray(value) && value.every(item => this.isString(item));
    }
    static isNumber(value) {
        return typeof value === 'number';
    }
    static isNumberArray(value) {
        return Array.isArray(value) && value.every(item => this.isNumber(item));
    }
    static isBoolean(value) {
        return typeof value === 'boolean';
    }
    static isConfig(value) {
        return value instanceof Config;
    }
    static isConfigArray(value) {
        return Array.isArray(value) && value.every(item => this.isConfig(item));
    }
    static isNullOrUndefined(value) {
        return value === null || value === undefined;
    }
}
