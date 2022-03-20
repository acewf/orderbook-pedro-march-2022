import type { WsMessage } from '../types';
import { CLOSED_CONNECTION, ERROR_CONNECTION } from '../constants';

class Socket extends WebSocket {
  initMessage: WsMessage;

  constructor(url: string, message: WsMessage) {
    super(url);
    this.initMessage = message
    this.onopen = this.onOpen.bind(this);
    this.onerror = this.onError.bind(this);
    this.onclose = this.onClose.bind(this);
  }

  onOpen(): void {
    this.send(JSON.stringify(this.initMessage));
  }

  onError(): void {
    postMessage({
      event: ERROR_CONNECTION
    });
  }

  onClose(): void {
    postMessage({
      event: CLOSED_CONNECTION
    });
  }
}

export default Socket
