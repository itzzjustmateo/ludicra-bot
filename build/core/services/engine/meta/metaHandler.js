import { MetaData, Service, ConfigFolder, Leaderboard, Utils, manager } from '../../../../index.js';
import MetaConfig from '../../../resources/scripting/meta.js';
export var MetaMode;
(function (MetaMode) {
    MetaMode["GLOBAL"] = "global";
    MetaMode["USER"] = "user";
    MetaMode["CHANNEL"] = "channel";
    MetaMode["MESSAGE"] = "message";
})(MetaMode || (MetaMode = {}));
export var MetaType;
(function (MetaType) {
    MetaType["STRING"] = "string";
    MetaType["NUMBER"] = "number";
    MetaType["BOOLEAN"] = "boolean";
    MetaType["LIST"] = "list";
})(MetaType || (MetaType = {}));
export default class MetaHandler extends Service {
    metas = new Map();
    constructor(manager) {
        super(manager);
        this.manager.database.addModels([MetaData]);
    }
    async initialize() {
        await MetaData.sync({ alter: true });
        await this.loadMetas();
        this.manager.logger.info("Meta handler initialized.");
    }
    async loadMetas() {
        const metas = await new ConfigFolder(this.manager.logger, 'scripting/metas', 'build/core/resources/scripting/metas').initialize(MetaConfig);
        for (const filePath of metas) {
            for (const config of filePath[1].getSubsections('metas')) {
                this.registerMeta(config);
            }
        }
    }
    async registerMeta(config) {
        const key = config.getString("key");
        const mode = config.getString("mode");
        const type = config.getString("type");
        let defaultValue = config.getStringOrNull("default");
        const leaderboardConfig = config.getSubsectionOrNull("leaderboard");
        if (leaderboardConfig && type === MetaType.NUMBER && mode === MetaMode.USER) {
            const enabled = leaderboardConfig.getBool("enabled");
            if (enabled) {
                const name = leaderboardConfig.getString("name");
                const description = leaderboardConfig.getString("description");
                const format = leaderboardConfig.getStringOrNull("format");
                class LeaderboardMeta extends Leaderboard {
                    name = name;
                    description = description;
                    async getData() {
                        const data = await MetaData.findAll({
                            where: {
                                key,
                                mode: mode
                            },
                            order: [['value', 'DESC']]
                        });
                        const formattedData = data.map((metaData, index) => {
                            return { position: index + 1, userId: metaData.scopeId, value: parseFloat(metaData.value) };
                        });
                        return formattedData;
                    }
                    formatValue(entry) {
                        if (!format)
                            return entry.value.toString();
                        const variables = [
                            { name: "value", value: entry.value }
                        ];
                        return Utils.applyVariables(format, variables);
                    }
                }
                this.manager.services.leaderboard.registerLeaderboard(new LeaderboardMeta(manager));
            }
        }
        if (this.metas.has(key)) {
            this.manager.logger.warn(`Meta with key ${key} is already registered.`);
            return;
        }
        const defaultValues = {
            [MetaType.STRING]: '',
            [MetaType.NUMBER]: '0',
            [MetaType.BOOLEAN]: 'false',
            [MetaType.LIST]: '[]'
        };
        if (!defaultValue) {
            defaultValue = defaultValues[type];
        }
        this.metas.set(key, { key, type, mode, default: defaultValue });
    }
    async findOrCreate(key, value, scopeId) {
        const metaConfig = this.metas.get(key);
        if (!metaConfig) {
            throw new Error(`Meta with key ${key} is not registered.`);
        }
        const meta = await MetaData.findOrCreate({ where: { key, scopeId }, defaults: { key, mode: metaConfig.mode, type: metaConfig.type, value: value, scopeId } });
        return meta[0];
    }
    async findOrNull(key, scopeId) {
        const metaConfig = this.metas.get(key);
        if (!metaConfig) {
            throw new Error(`Meta with key ${key} is not registered.`);
        }
        return MetaData.findOne({ where: { key, scopeId } });
    }
    resolveScopeId(context, mode) {
        switch (mode) {
            case 'global': return 'global';
            case 'user': return context.user?.id;
            case 'channel': return context.channel?.id;
            case 'message': return context.message?.id;
            default: return undefined;
        }
    }
}
