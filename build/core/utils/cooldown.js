import { Collection, time } from 'discord.js';
export class Cooldown {
    duration;
    ids;
    constructor(durationInSeconds) {
        this.duration = durationInSeconds * 1000;
        this.ids = new Collection();
    }
    isOnCooldown(id) {
        if (!this.ids.has(id))
            return false;
        const now = new Date().getTime();
        const lastUsed = this.ids.get(id);
        if (lastUsed === undefined) {
            throw new Error(`Expected a timestamp for id ${id}, but none was found.`);
        }
        return now - lastUsed < this.duration;
    }
    setCooldown(id) {
        if (this.isOnCooldown(id))
            return false;
        this.ids.set(id, new Date().getTime());
        return true;
    }
    getRemainingTime(id) {
        if (!this.ids.has(id))
            return 0;
        const now = new Date().getTime();
        const lastUsed = this.ids.get(id);
        if (lastUsed === undefined) {
            throw new Error(`Expected a timestamp for user ${id}, but none was found.`);
        }
        const timeElapsed = now - lastUsed;
        return Math.max(0, this.duration - timeElapsed);
    }
    reset(id) {
        this.ids.delete(id);
    }
    resetAll() {
        this.ids.clear();
    }
    endsAtFormatted(id) {
        if (!this.ids.has(id)) {
            throw new Error(`User ${id} is not in cooldown.`);
        }
        const lastUsed = this.ids.get(id);
        if (lastUsed === undefined) {
            throw new Error(`Expected a timestamp for user ${id}, but none was found.`);
        }
        return time(Math.round((lastUsed + this.duration) / 1000), "R");
    }
}
