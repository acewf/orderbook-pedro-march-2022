interface IWorker {
  postMessage: (value: string) => void;
  /** @deprecated */
  addListener(type: string, listener: IWorkerListener): void;
  /** @deprecated */
  removeListener(type: string, listener: IWorkerListener): void;
  addEventListener(type: string, listener: IWorkerListener): void;
  removeEventListener(type: string, listener: IWorkerListener): void;
  dispatchEvent(event: Event): boolean;
  terminate(event: Event): void;
  onPostMessage: (message: string) => void;
}

export type IWorkerListener = (ev: MessageEvent) => void;

class Worker {
  private listeners: {
    [key: string]: IWorkerListener[];
  } = {};

  private workerList!: IWorker;

  constructor(props: object) {
    Object.defineProperty(window, 'Worker', {
      writable: true,
      value: jest.fn().mockImplementation(path => {
        this.workerList = {
          postMessage: (message: string) => {
            this.onPostMessage(message)
          },
          addListener: (type, listener) => {
            this.addListener(type, listener);
          },
          removeListener: (type, listener) => {
            this.removeListener(type, listener);
          },
          addEventListener: (type, listener) => {
            this.addListener(type, listener);
          },
          removeEventListener: (type, listener) => {
            this.removeListener(type, listener);
          },
          dispatchEvent: jest.fn(),
          terminate: jest.fn(),
          onPostMessage: (x) => x
        };

        return this.workerList;
      }),
    })
  }

  public onPostMessage(message: string): void {
  }

  /**
   * Adds a new listener function for the specified media query
   * @private
   */
  private addListener(type: string, listener: IWorkerListener): void {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }

    const query = this.listeners[type];
    const listenerIndex = query.indexOf(listener);

    if (listenerIndex !== -1) return;
    query.push(listener);
  }

  /**
   * Removes a previously added listener function for the specified media query
   * @private
   */
  private removeListener(type: string, listener: IWorkerListener): void {
    if (!this.listeners[type]) return;

    const query = this.listeners[type];
    const listenerIndex = query.indexOf(listener);

    if (listenerIndex === -1) return;
    query.splice(listenerIndex, 1);
  }

  /**
   * Returns a copy of the array of listeners for the specified media query
   * @public
   */
  public getListeners(type: string): IWorkerListener[] {
    if (!this.listeners[type]) return [];
    return this.listeners[type].slice();
  }

  public clear(): void {
    this.listeners = {};
  }

  public destroy(): void {
    this.clear();
  }
}

export default Worker;
