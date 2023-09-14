import { Loggeable } from "./app";

export abstract class BaseNotification implements Loggeable {
    type: ["email", "sms", "whatsapp", "push"];

    constructor(private message: string) {}

    getMessage(): string {
        return this.message;
    }

    abstract providerName(): string;
    abstract getType(): string;

    log(): Promise<void> {
        console.log("Auditoria... ", this.message);

        return Promise.resolve();
    }
}
