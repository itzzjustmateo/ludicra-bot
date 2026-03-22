import { Events as DiscordEvents } from 'discord.js';
var BotEvents;
(function (BotEvents) {
    BotEvents["EveryHour"] = "everyHour";
    BotEvents["EveryMinute"] = "everyMinute";
    BotEvents["EveryDay"] = "everyDay";
    BotEvents["ButtonClick"] = "buttonClick";
    /** @deprecated Use Events.SelectMenuSubmit instead */
    BotEvents["SelectMenu"] = "selectMenu";
    BotEvents["SelectMenuSubmit"] = "selectMenuSubmit";
    BotEvents["ModalSubmit"] = "modalSubmit";
    BotEvents["VoiceJoin"] = "voiceJoin";
    BotEvents["VoiceLeave"] = "voiceLeave";
    BotEvents["BotReady"] = "botReady";
})(BotEvents || (BotEvents = {}));
const Events = {
    ...BotEvents,
    ...DiscordEvents
};
export { Events };
