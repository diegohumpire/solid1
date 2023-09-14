import { BaseNotification } from "../BaseNotification";
import { Queueable } from "../app";

export class FirebaseNotification
    extends BaseNotification
    implements Queueable
{
    // Hack ya que no puse usar instanceof
    queue: "queue";
    _devices: string[];

    constructor(message: string, _devices: string[]) {
        super(message);
        this._devices = _devices;
    }

    providerName(): string {
        return "Firebase";
    }

    getType(): string {
        return "push";
    }

    serializeForQueue(): string {
        return JSON.stringify({
            message: this.getMessage(),
            provider: this.providerName(),
        });
    }
}
