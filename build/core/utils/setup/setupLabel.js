import { Utils } from '../../../index.js';
import { LabelBuilder } from 'discord.js';
export async function setupLabel(settings) {
    const config = settings.config;
    const variables = settings.variables || [];
    const context = settings.context;
    const description = config.getStringOrNull('description', true);
    const label = new LabelBuilder()
        .setLabel(await Utils.applyVariables(config.getString('label', true), variables, context));
    if (description)
        label.setDescription(await Utils.applyVariables(description, variables, context));
    const components = await Utils.setupComponent({ config: config.getSubsection('component'), variables, context });
    if (components?.length)
        label.data.component = components[0];
    return label;
}
