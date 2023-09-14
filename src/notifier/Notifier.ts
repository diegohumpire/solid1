import { BaseNotification } from "./BaseNotification";
import { NotificationProvider } from "./NotificationProvider";
import { IQueueSystem, Queueable } from "./app";

export class Notifier {
    constructor(
        private notificationProvider: NotificationProvider[],
        private queueSystem: IQueueSystem
    ) {}

    async send(notification: BaseNotification | Queueable): Promise<void> {
        // En Typescript no se puede hacer esto: (notification instanceof Queueable)
        if (this.instanceOfQueueable(notification)) {
            // @ts-ignore
            console.log(
                `EN COLA: Sending notification later...`,
                notification.serializeForQueue()
            );
            this.queueSystem.push(notification.serializeForQueue());

            return Promise.resolve();
        }

        await this.dispatch(notification);
    }

    async sendMany(notifications: BaseNotification[]): Promise<void> {
        for (const notification of notifications) {
            await this.send(notification);
        }
    }

    // En Typescript no se puede hacer esto: (notification instanceof Queueable)
    private instanceOfQueueable(object: any): object is Queueable {
        return "serializeForQueue" in object;
    }

    private dispatch(notification: BaseNotification): void {
        for (const provider of this.notificationProvider) {
            if (notification.getType() == provider.type) {
                provider.send(notification);
                return;
            }
        }
    }
}
