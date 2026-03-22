import { Event, Events } from '../../../../index.js';
export default class EveryDayEvent extends Event {
    name = Events.EveryDay;
    async execute(primaryGuild) {
        const context = {
            guild: primaryGuild,
            content: new Date().toDateString()
        };
        const variables = [
            { name: 'date', value: new Date().toDateString() }
        ];
        this.manager.services.engine.event.emit('everyDay', context, variables);
    }
}
;
