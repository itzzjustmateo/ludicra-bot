import { Utils } from '../../../index.js';
import { TextDisplayBuilder } from 'discord.js';
export async function setupTextDisplay(settings) {
    const config = settings.config;
    const variables = settings.variables || [];
    const context = settings.context;
    const textDisplay = new TextDisplayBuilder()
        .setContent(await Utils.applyVariables(config.getString('content', true), variables, context));
    return textDisplay;
}
