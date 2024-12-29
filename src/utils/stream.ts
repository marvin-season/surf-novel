export class MessageBox {
  __stream = true;
  #transformStream;

  constructor() {
    this.#transformStream = new TransformStream();
  }

  isStream() {
    return this.__stream;
  }

  setIsStream(isStream: boolean) {
    this.__stream = isStream;
    return this; // For chaining
  }

  close() {
    this.#transformStream.readable.cancel();
    this.#transformStream.writable.abort();
  }

  async writeMessage(message: string) {
    const writer = this.#transformStream.writable.getWriter();
    try {
      await writer.write(message);
    } catch (error) {
      console.error("Failed to write message:", error);
    } finally {
      writer.releaseLock(); // Ensure the lock is released
    }
  }

  async *readMessage() {
    const readableStream = this.#transformStream.readable;
    try {
      for await (const element of readableStream as any) {
        yield element;
      }
    } catch (e) {
    } finally {
      readableStream.getReader().releaseLock();
    }
  }
}

export class CharMessageBox extends MessageBox {
  constructor() {
    super();
    this.setIsStream(true);
  }

  async writeMessage(message: string) {
    try {
      for (const char of message) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        await super.writeMessage(char);
      }

      // close the stream
      super.close();
    } catch (error) {
      console.error("Failed to write message:", error);
    } finally {
    }
  }
}

export const messagePingPong = async (
  message: string,
  onMessage: (message: string) => void,
) => {
  const messageBox = new CharMessageBox();
  messageBox.writeMessage(message);
  const iter = messageBox.readMessage();
  debugger;
  for await (const message of iter) {
    onMessage(message);
  }
};
