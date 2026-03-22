import { Event, Events } from '../../../../index.js';
export default class ChannelDeleteEvent extends Event {
    name = Events.ChannelDelete;
    async execute(channel) {
        if (channel.isDMBased())
            return;
        if (!channel.guild || channel.guild.id !== this.manager.primaryGuildId)
            return;
        const context = {
            guild: channel.guild,
            channel: channel,
            content: channel.name,
        };
        this.manager.services.engine.event.emit('channelDelete', context);
    }
}
;
