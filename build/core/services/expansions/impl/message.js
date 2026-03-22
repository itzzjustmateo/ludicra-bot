import { Expansion, Utils } from '../../../../index.js';
export default class MessageExpansion extends Expansion {
    name = 'message';
    async onRequest(context, placeholder) {
        if (!context.message)
            return;
        switch (placeholder) {
            case 'id':
                return context.message.id;
            case 'content':
                return Utils.blockPlaceholders(context.message.content);
            case 'author_id':
                return context.message.author.id;
            case 'url':
                return context.message.url;
        }
    }
}
