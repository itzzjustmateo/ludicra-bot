import { Expansion, Utils } from '../../../../index.js';
export default class MathExpansion extends Expansion {
    name = 'math';
    async onRequest(context, placeholder) {
        try {
            const result = Utils.evaluateNumber(placeholder);
            return result?.toString();
        }
        catch (error) {
            this.logger.error("Error while calculating expression: " + error);
            return "Calculation error";
        }
    }
}
