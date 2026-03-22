import { Event, Events } from '../../../../index.js';
export default class VoiceStateUpdateEvent extends Event {
    name = Events.VoiceStateUpdate;
    priority = 0;
    async execute(oldState, newState) {
        if (oldState.channelId === newState.channelId) {
            return;
        }
        if (oldState.channel) {
            this.manager.client.emit(Events.VoiceLeave, oldState);
        }
        if (newState.channel) {
            this.manager.client.emit(Events.VoiceJoin, newState);
        }
    }
}
