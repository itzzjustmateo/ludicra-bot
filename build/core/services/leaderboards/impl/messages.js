import { Op } from 'sequelize';
import { User, Leaderboard, Utils } from '../../../../index.js';
export default class MessagesLeaderboard extends Leaderboard {
    name = "messages";
    description = "Messages leaderboard.";
    async getData() {
        const data = await User.findAll({
            order: [['messages', 'DESC']],
            where: {
                messages: {
                    [Op.gt]: 0
                },
                isBot: false
            }
        });
        const formattedData = data.map((user, index) => {
            return { position: index + 1, userId: user.id, value: user.messages };
        });
        return formattedData;
    }
    async formatValue(entry) {
        const variables = [
            { name: "value", value: entry.value }
        ];
        const format = this.manager.lang.getString('leaderboard.value.messages');
        return Utils.applyVariables(format, variables);
    }
}
