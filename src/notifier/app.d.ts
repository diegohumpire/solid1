// El objeto que se va a enviar por la cola
export interface Queueable {
    serializeForQueue(): string;
}

// El objeto se puede loggear
export interface Loggeable {
    log(): Promise<void>;
}

export interface IQueueSystem {
    // Implementación de la cola
    // Save on Redis or RabbitMQ
    push(item: string): void;
}

export interface User {
    name: string;
    email: string;
    phoneNumber: string;
    devices: string[];
}
