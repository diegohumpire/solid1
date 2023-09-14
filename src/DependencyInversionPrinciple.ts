import { Notifier } from "./notifier/Notifier";
import { IQueueSystem } from "./notifier/app";
import { FirebaseProvider } from "./notifier/firebase/Firebase";
import { FirebaseNotification } from "./notifier/firebase/FirebaseNotification";
import { SendGridProvider } from "./notifier/sendgrid/SendGrid";
import { SendGridNotification } from "./notifier/sendgrid/SendGridNotification";
import { TwilioProvider } from "./notifier/twilio/Twilio";
import { TwilioNotification } from "./notifier/twilio/TwilioNotification";

class AuthCodeNotification extends TwilioNotification {}
class AlertMailNotificationApp extends SendGridNotification {}
class PusNotificationApp extends FirebaseNotification {}

class RabbitMQ implements IQueueSystem {
    push(message: string): void {}
}

class MyUserService {
    constructor(private notificationService: Notifier) {}

    // @ts-ignore
    sendVerificationCode({ name, email, phoneNumber, devices }: User) {
        console.log("Sending verification code to", name);
        const smsNotification: AuthCodeNotification = new AuthCodeNotification(
            "Mensaje de prueba",
            phoneNumber
        );
        // Generate code authentication and send it
        this.notificationService.send(smsNotification);

        const emailNotification: AlertMailNotificationApp =
            new AlertMailNotificationApp(
                "<p>Alerta de sistema</p>",
                email,
                "Alerta de sistema"
            );

        const slackNotification: PusNotificationApp = new PusNotificationApp(
            "Manda este mensaje por el canal #alertas",
            devices
        );
        // Alert users for this and some system information
        this.notificationService.sendMany([
            emailNotification,
            slackNotification,
        ]);
    }
}

const notificationService = new Notifier(
    [new SendGridProvider(), new FirebaseProvider(), new TwilioProvider()],
    new RabbitMQ()
);

const userService = new MyUserService(notificationService);

userService.sendVerificationCode({
    name: "John Doe",
    email: "dh@cix.com",
    phoneNumber: "+51999999999",
    devices: ["device1", "device2"],
});
