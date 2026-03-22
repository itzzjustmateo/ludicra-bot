import { Event, Events } from '../../../../index.js';
export default class EveryHourEvent extends Event {
    name = Events.EveryHour;
    async execute(primaryGuild) {
        const context = {
            guild: primaryGuild,
            content: new Date().getHours().toString()
        };
        const variables = [
            { name: 'hour', value: new Date().getHours().toString() }
        ];
        this.manager.services.engine.event.emit('everyHour', context, variables);
    }
}
;
