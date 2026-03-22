import { Utils } from '../../../index.js';
import { ThumbnailBuilder } from 'discord.js';
export async function setupThumbnail(settings) {
    const config = settings.config;
    const variables = settings.variables || [];
    const context = settings.context;
    const description = await Utils.applyVariables(config.getStringOrNull('description', true), variables, context);
    const thumbnail = new ThumbnailBuilder()
        .setSpoiler(config.getBoolOrNull('spoiler') || false)
        .setURL(await Utils.applyVariables(config.getString('url', true), variables, context));
    if (description)
        thumbnail.setDescription(description);
    return thumbnail;
}
