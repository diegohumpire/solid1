import { BaseNotification } from "../BaseNotification";
import { Queueable } from "../app";

export class SendGridNotification
    extends BaseNotification
    implements Queueable
{
    // Hack ya que no puse usar instanceof
    _to: string;
    _subject: string;
    _attachments?: string[] = [];

    constructor(message: string, _to: string, _subject: string) {
        super(message);
        this._to = _to;
        this._subject = _subject;
    }

    providerName(): string {
        return "SendGrid";
    }

    getType(): string {
        return "email";
    }

    serializeForQueue(): string {
        return JSON.stringify({
            message: this.getMessage(),
            provider: this.providerName(),
        });
    }
}
