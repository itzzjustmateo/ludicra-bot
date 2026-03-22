import { Condition } from '../../../../index.js';
export default class isBoosterCondition extends Condition {
    id = "isBooster";
    isMet(condition, context, variables) {
        if (!context.member)
            return condition.missingContext("member");
        return !!context.member.premiumSince;
    }
}
