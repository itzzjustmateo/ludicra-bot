import { Command, CommandBuilder, Utils } from '../../../../index.js';
import { PermissionFlagsBits } from 'discord.js';
export default class ParseCommand extends Command {
    build() {
        return new CommandBuilder()
            .setName('parse')
            .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
            .addStringOption(option => option.setName("text")
            .setRequired(true))
            .addUserOption(option => option.setName("user")
            .setRequired(false));
    }
    async execute(interaction, user) {
        const target = interaction.options.getMember("user");
        const targetUser = target ? await this.manager.services.user.findOrCreate(target) : user;
        interaction.reply(await this.manager.lang.buildMessage({
            key: 'parsed',
            ephemeral: true,
            variables: [
                { name: "parsed_text", value: interaction.options.getString("text", true) },
                ...Utils.userVariables(targetUser, 'target')
            ],
            context: {
                user: user,
                guild: interaction.guild || undefined,
                channel: interaction.channel || undefined
            }
        }));
    }
}
