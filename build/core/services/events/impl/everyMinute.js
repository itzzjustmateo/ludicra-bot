import { Event, Events } from '../../../../index.js';
export default class EveryMinuteEvent extends Event {
    name = Events.EveryMinute;
    async execute(primaryGuild) {
        const context = {
            guild: primaryGuild,
            content: new Date().getMinutes().toString()
        };
        const variables = [
            { name: 'minute', value: new Date().getMinutes().toString() }
        ];
        this.manager.services.engine.event.emit('everyMinute', context, variables);
    }
}
;
