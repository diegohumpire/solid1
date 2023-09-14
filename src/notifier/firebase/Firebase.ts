import { BaseNotification } from "../BaseNotification";
import { NotificationProvider } from "../NotificationProvider";

export interface IFirebaseProvider extends NotificationProvider {
    // Comportamientos de Firebase
    generateToken(): Promise<string>;
}

export class FirebaseProvider implements IFirebaseProvider {
    type = "push";
    async generateToken(): Promise<string> {
        const token = await Promise.resolve("token");

        console.log(`Token generated: ${token}`);
        return Promise.resolve(token);
    }

    async send(notification: BaseNotification): Promise<void> {
        console.log("Sending push notification with Firebase");
        return Promise.resolve();
    }
}
