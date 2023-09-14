import { BaseNotification } from "./BaseNotification";

export interface NotificationProvider {
    type: string;
    send(notification: BaseNotification): Promise<void>;
}
