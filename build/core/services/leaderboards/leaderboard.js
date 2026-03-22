import { Base } from '../../../index.js';
export class Leaderboard extends Base {
    formatValue(entry) {
        return entry.value.toString();
    }
}
