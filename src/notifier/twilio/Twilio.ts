import { BaseNotification } from "../BaseNotification";
import { NotificationProvider } from "../NotificationProvider";

export interface ITwilioProvider extends NotificationProvider {
    // Comportamientos de Twilio
}

export class TwilioProvider implements ITwilioProvider {
    type = "sms";

    async send(notification: BaseNotification): Promise<void> {
        console.log("Sending SMS with Twilio");
        return Promise.resolve();
    }
}
