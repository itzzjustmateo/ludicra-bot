import { Event, Events } from '../../../../index.js';
export default class ButtonClickEvent extends Event {
    name = Events.ButtonClick;
    async execute(interaction, user) {
        if (!interaction.customId.startsWith("script_"))
            return;
        const args = [];
        let customId = interaction.customId;
        if (interaction.customId.includes(':')) {
            const split = interaction.customId.match(/('.*?'|".*?"|[^:]+)+/g);
            if (split) {
                customId = split[0];
                args.push(...split.slice(1).map(arg => arg.replace(/^['"]|['"]$/g, '')));
            }
        }
        const context = {
            guild: interaction.guild || undefined,
            member: interaction.member || undefined,
            user: user,
            channel: interaction.channel || undefined,
            content: customId,
            interaction: interaction,
            message: interaction.message,
        };
        const variables = [
            { name: 'button_custom_id', value: customId },
            { name: 'button_args_count', value: args.length },
            { name: 'button_args', value: args.join(', ') }
        ];
        for (let i = 0; i < args.length; i++) {
            variables.push({ name: `button_arg_${i}`, value: args[i] });
        }
        this.manager.services.engine.event.emit('buttonClick', context, variables);
    }
}
;
