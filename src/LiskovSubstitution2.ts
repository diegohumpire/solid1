// @ts-ignore
// @ts-check
class AppNotification {
    message: string;

    constructor(message: string) {
        this.message = message;
    }

    send() {
        console.log(`Enviando: ${this.message}`);
    }
}

// @ts-ignore
class EmailNotification extends AppNotification {
    emailAddress: string;

    constructor(message: string, emailAddress: string) {
        super(message);
        this.emailAddress = emailAddress;
    }

    sendEmail() {
        console.log(`Enviando email a ${this.emailAddress}: ${this.message}`);
    }
}

// @ts-ignore
class SMSNotification extends AppNotification {
    phoneNumber: string;

    constructor(message: string, phoneNumber: string) {
        super(message);
        this.phoneNumber = phoneNumber;
    }

    sendSMS() {
        console.log(`Enviando SMS a ${this.phoneNumber}: ${this.message}`);
    }
}

// @ts-ignore
class NotificationService {
    // @ts-ignore
    sendNotification(notifications: AppNotification[]) {
        // Envío las notificaciones
        for (const notification of notifications) {
            if (notification instanceof EmailNotification) {
                notification.sendEmail();
            } else if (notification instanceof SMSNotification) {
                notification.sendSMS();
            } else {
                // @ts-ignore
                notification.send();
            }
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
