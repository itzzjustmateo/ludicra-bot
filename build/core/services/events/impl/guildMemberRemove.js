import { Event, Events } from '../../../../index.js';
export default class GuildMemberRemoveEvent extends Event {
    name = Events.GuildMemberRemove;
    async execute(member) {
        if (member.guild.id !== this.manager.primaryGuildId)
            return;
        const user = await this.manager.services.user.findOrCreate(member);
        const context = {
            member: member,
            user: user,
            guild: member.guild,
            content: member.displayName
        };
        this.manager.services.engine.event.emit('guildMemberRemove', context);
    }
}
;
