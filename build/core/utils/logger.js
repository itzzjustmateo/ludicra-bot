import chalk from 'chalk';
import { stdout } from 'process';
export class Logger {
    prefix;
    constructor(prefix = "ItsMyBot") {
        this.prefix = prefix;
    }
    getCurrentTimestamp() {
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');
        return `${hh}:${mm}:${ss}`;
    }
    warn(...text) {
        const timestamp = this.getCurrentTimestamp();
        const message = `[${timestamp}] ${chalk.bold(chalk.hex("#FADD05")("[WARN]"))}: [${this.prefix}] ${text.join('\n')}`;
        stdout.write(message + '\n');
    }
    error(...text) {
        const timestamp = this.getCurrentTimestamp();
        const messageParts = [];
        const errors = [];
        for (const item of text) {
            if (typeof item === 'string') {
                messageParts.push(item);
            }
            else if (Array.isArray(item)) {
                messageParts.push(...item);
            }
            else {
                errors.push(item);
            }
        }
        const message = `[${timestamp}] ${chalk.bold(chalk.hex("#FF380B")("[ERROR]"))}: [${this.prefix}] ${messageParts.join('\n')}`;
        stdout.write(message + '\n');
        console.error(...errors);
    }
    empty(...text) {
        const message = text.join(' ');
        stdout.write(message + '\n');
    }
    info(...text) {
        const timestamp = this.getCurrentTimestamp();
        const message = `[${timestamp}] ${chalk.bold(chalk.hex("#61FF73")("[INFO]"))}: [${this.prefix}] ${text.join('\n')}`;
        stdout.write(message + '\n');
    }
    debug(...text) {
        const timestamp = this.getCurrentTimestamp();
        const message = `[${timestamp}] ${chalk.bold(chalk.hex("#17D5F7")("[DEBUG]"))}: [${this.prefix}] ${text.join('\n')}`;
        stdout.write(message + '\n');
    }
}
