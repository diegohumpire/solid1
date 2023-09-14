// @ts-ignore
// @ts-check
interface AppNotification {
    send(): void;
}

// @ts-ignore
class EmailNotification implements AppNotification {
    constructor(private message: string, private emailAddress: string) {}

    send() {
        console.log(`Enviando email a ${this.emailAddress}: ${this.message}`);
    }
}

// @ts-ignore
class SMSNotification implements AppNotification {
    constructor(private message: string, private phoneNumber: string) {}

    send() {
        console.log(`Enviando SMS a ${this.phoneNumber}: ${this.message}`);
    }
}

// @ts-ignore
class NotificationService {
    // queue: QueueBus<Notification> = new QueueBus<Notification>();

    // @ts-ignore
    sendNotification(notifications: AppNotification[]) {
        // Envío las notificaciones
        for (const notification of notifications) {
            notification.send();
        }
    }
}

// @ts-ignore
class UserService {
    constructor(private notificationService: NotificationService) {}

    // @ts-ignore
    createUser({ name, email, phoneNumber }) {
        // Creo el usuario
        // Quiero notificar al usuario de que se ha creado su cuenta en todos los canales
        const emailNotification: EmailNotification = new EmailNotification(
            "Se ha creado tu cuenta",
            email
        );

        const smsNotification: SMSNotification = new SMSNotification(
            "Se ha creado tu cuenta",
            phoneNumber
        );

        this.notificationService.sendNotification([
            emailNotification,
            smsNotification,
        ]);
    }
}

const notificationService = new NotificationService();
const userService = new UserService(notificationService);

userService.createUser({
    name: "John",
    email: "abc@bc.com",
    phoneNumber: "123456789",
});
