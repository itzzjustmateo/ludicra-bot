import { Condition } from '../../../../index.js';
import { MessageType } from 'discord.js';
export default class isReplyCondition extends Condition {
    id = "isReply";
    isMet(condition, context, variables) {
        if (!context.message)
            return condition.missingContext("message");
        return context.message.type === MessageType.Reply;
    }
}
