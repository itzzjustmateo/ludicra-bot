import { Condition } from '../../../../index.js';
export default class IsBotCondition extends Condition {
    id = "isBot";
    isMet(condition, context, variables) {
        if (!context.member)
            return condition.missingContext("member");
        return context.member.user.bot;
    }
}
