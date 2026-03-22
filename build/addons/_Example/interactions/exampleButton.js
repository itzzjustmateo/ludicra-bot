import { Button } from '../../../index.js';
export default class ExampleButton extends Button {
    customId = 'example_id';
    usingPermissionFrom = 'helloWorld'; // Use the same permission as the 'helloWorld' command
    async execute(interaction, user) {
    }
}
