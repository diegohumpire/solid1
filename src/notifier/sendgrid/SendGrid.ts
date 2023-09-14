import { BaseNotification } from "../BaseNotification";
import { NotificationProvider } from "../NotificationProvider";

export interface ISendGridProvider extends NotificationProvider {
    setApiKey(apiKey: string): void;
}

export class SendGridProvider implements ISendGridProvider {
    type = "email";
    _apiKey: string;

    async send(notification: BaseNotification): Promise<void> {
        console.log(
            `Sending email with SendGrid: ${notification.getMessage()}`
        );
        return Promise.resolve();
    }

    setApiKey(apiKey: string): void {
        this._apiKey = apiKey;
    }
}
