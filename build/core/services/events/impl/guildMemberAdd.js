import { Event, Events } from '../../../../index.js';
export default class GuildMemberAddEvent extends Event {
    name = Events.GuildMemberAdd;
    priority = 5;
    async execute(member) {
        if (member.guild.id !== this.manager.primaryGuildId)
            return;
        const user = await this.manager.services.user.findOrCreate(member);
        if (!member.pending) {
            const context = {
                member: member,
                user: user,
                guild: member.guild,
                content: member.displayName
            };
            this.manager.services.engine.event.emit('guildMemberAdd', context);
        }
    }
}
;
