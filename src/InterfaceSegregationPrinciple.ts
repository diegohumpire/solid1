interface NotificationApp {
    send(): void;
}

interface AsyncNotificationApp {
    sendAsync(): Promise<void>;
}

class EmailNotificationApp implements NotificationApp, AsyncNotificationApp {
    send(): void {}
    sendAsync(): Promise<void> {
        return Promise.resolve();
    }
}

class SMSNotificationApp implements NotificationApp {
    send(): void {}
}

class SlackNotificationApp implements NotificationApp, AsyncNotificationApp {
    send(): void {}
    sendAsync(): Promise<void> {
        return Promise.resolve();
    }
}

class QueueBus<T> {
    push(item: T): void {
        console.log("Pushing item to queue", item);
    }
}

// @ts-ignore
class NotificationService {
    queue: QueueBus<AsyncNotificationApp> =
        new QueueBus<AsyncNotificationApp>();

    // @ts-ignore
    sendNotification(notifications: AppNotification[]) {
        // Envío las notificaciones
        for (const notification of notifications) {
            notification.send();
        }
    }

    sendAsyncNotification(notifications: AsyncNotificationApp[]) {
        for (const notification of notifications) {
            this.queue.push(notification);
        }
    }
}

// @ts-ignore
class UserService {
    constructor(private notificationService: NotificationService) {}

    // @ts-ignore
    sendVerificationCode({ name, email, phoneNumber }) {
        const smsNotification: SMSNotificationApp = new SMSNotificationApp();
        // Generate code authentication and send it
        // @ts-ignore
        this.notificationService.sendNotification([smsNotification]);

        const emailNotification: EmailNotificationApp =
            new EmailNotificationApp();

        const slackNotification: SlackNotificationApp =
            new SlackNotificationApp();
        // Alert users for this and some system information
        // @ts-ignore
        this.notificationService.sendAsyncNotification([
            emailNotification,
            slackNotification,
        ]);
    }
}
