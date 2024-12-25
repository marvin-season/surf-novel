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

export const messagePingPong = async (
  message: string,
  onMessage: (message: string) => void
) => {
  const messageBox = new MessageBox();
  messageBox.writeMessage(message);
  for await (const message of messageBox.readMessage()) {
    onMessage(message);
  }
};
