import { Base } from '../../../index.js';
export class Event extends Base {
    once = false;
    priority = 3;
    every = 1;
    current = 1;
    canceled = false;
    /**
      * Cancel the execution of further events in the current event cycle.
      */
    cancelEvent() {
        this.canceled = true;
    }
}
