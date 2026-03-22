import { Utils } from '../../../index.js';
import { ContainerBuilder } from 'discord.js';
export async function setupContainer(settings) {
    const config = settings.config;
    const variables = settings.variables || [];
    const context = settings.context;
    const colorString = await Utils.applyVariables(config.getStringOrNull("color", true), variables, context);
    const color = Utils.getColorFromString(colorString);
    const container = new ContainerBuilder()
        .setSpoiler(config.getBoolOrNull("spoiler") || false);
    if (color)
        container.setAccentColor(color);
    for (const componentConfig of config.getSubsections("components")) {
        const components = await Utils.setupComponent({ config: componentConfig, variables, context });
        if (components?.length)
            container.components.push(...components);
    }
    return container;
}
