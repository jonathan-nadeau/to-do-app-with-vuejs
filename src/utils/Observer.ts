export type Events = Record<string, string>;
type Subscribers = Record<string, Array<(...args: any[]) => void>>;

class Observer {
  subscribers: Subscribers = {};

  constructor(events: Events) {
    this.subscribers = this.createEventsObject(events);
  }

  private createEventsObject(events: Events) {
    return Object.values(events).reduce(
      (accumulator: Subscribers, event: string) => {
        if (!accumulator[event]) {
          accumulator = { ...accumulator, [event]: [] };
        }
        return accumulator;
      },
      {}
    );
  }

  subscribe(event: string, callback: (...args: any[]) => void) {
    if (!this.subscribers[event]) return;
    this.subscribers[event].push(callback);
    return () => this.unsuscribe(event, callback);
  }

  unsuscribe(event: string, callback: (...args: any[]) => void) {
    if (!this.subscribers[event]) return;
    this.subscribers[event] = this.subscribers[event].filter(
      (cb) => cb !== callback
    );
  }

  publish(event: string, ...args: any[]) {
    if (!this.subscribers[event]) return;
    this.subscribers[event].forEach((cb) => {
      cb(...args);
    });
  }
}

export default Observer;
