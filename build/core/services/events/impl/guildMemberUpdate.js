import { Event, Events } from '../../../../index.js';
export default class GuildMemberUpdateEvent extends Event {
    name = Events.GuildMemberUpdate;
    priority = 5;
    async execute(oldMember, newMember) {
        if (newMember.guild.id !== this.manager.primaryGuildId)
            return;
        if (oldMember === newMember)
            return;
        const user = await this.manager.services.user.findOrCreate(newMember);
        const context = {
            member: newMember,
            user: user,
            guild: newMember.guild
        };
        if (oldMember.pending && !newMember.pending) {
            context.content = newMember.displayName;
            this.manager.services.engine.event.emit('guildMemberAdd', context);
        }
        if (oldMember.displayName !== newMember.displayName) {
            context.content = newMember.displayName;
            this.manager.services.engine.event.emit('displayNameUpdate', context);
        }
        if (!oldMember.premiumSince && newMember.premiumSince) {
            context.content = newMember.displayName;
            this.manager.services.engine.event.emit('guildBoostAdd', context);
        }
        if (oldMember.premiumSince && !newMember.premiumSince) {
            context.content = newMember.displayName;
            this.manager.services.engine.event.emit('guildBoostRemove', context);
        }
    }
}
;
