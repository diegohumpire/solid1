import { BaseNotification } from "../BaseNotification";

export class TwilioNotification extends BaseNotification {
    _phoneNumber: string;

    constructor(message: string, _phoneNumber: string) {
        super(message);
        this._phoneNumber = _phoneNumber;
    }

    providerName(): string {
        return "SendGrid";
    }

    getType(): string {
        return "sms";
    }
}
