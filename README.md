# Principios S.O.L.I.D

Cinco principios de _Diseño de Software_ Orientado a Objetos.

Estos principios ayudan a los desarrolladores a crear sistemas, aplicaciones, librerías, etc que sean más _*mantenibles, flexibles y escalables.*_

1. S - Principio de Responsabilidad Única (Single Responsibility Principle, SRP)
2. O - Principio Abierto/Cerrado (Open/Closed Principle, OCP)
3. L - Principio de Sustitución de Liskov (Liskov Substitution Principle, LSP)
4. I - Principio de Segregación de Interfaz (Interface Segregation Principle, ISP)
5. D - Principio de Inversión de Dependencias (Dependency Inversion Principle, DIP)

Nota 1: Debemos de tomar estos principios como una guía, no traten de cumplirlas siempre y al 100%.

Nota 2: _SHOULD_ > _MUST_

Nota 3: Siempre "DEPENDE DE..."

## Single Responsibility Principle

Una clase debe tener solo una razón para cambiar. Esto significa que una clase debe tener solo una tarea o responsabilidad

```Typescript
class Book {
  title: string;
  author: string;
  content: string;

  constructor(title: string, author: string, content: string) {
    this.title = title;
    this.author = author;
    this.content = content;
  }

  // TODO: Esto no debería de estar aquí... 🧐🤔
  saveToDatabase() {
    // código para guardar el libro en la base de datos
    console.log("Guardando el libro en la base de datos...");
  }
}
```

Refactorizando para cumplir con el principio:

```Typescript
class Book {
  title: string;
  author: string;
  content: string;

  constructor(title: string, author: string, content: string) {
    this.title = title;
    this.author = author;
    this.content = content;
  }
}

class BookRepository {
  save(book: Book) {
    // código para guardar el libro en la base de datos
    console.log("Guardando el libro en la base de datos...", book);
  }
}
```

## Open/Closed Principle

Este principio establece que las entidades de software (como clases, módulos o funciones) deben estar abiertas para extensión, pero cerradas para modificación. Esto significa que el comportamiento de un entidad puede ser extendido sin modificar su código fuente.

Entonces cuando la funcionalidad de un módulo necesita ser extendida o cambiada, deberías poder hacerlo añadiendo nuevo código, no modificando el código existente.

```Typescript
class Mage {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  castSpell(spellType: string): string {
    if (spellType === "fireball") {
      return `${this.name} lanza una bola de fuego!`;
    } else if (spellType === "frostbolt") {
      return `${this.name} lanza un rayo de hielo!`;
    }
    // Si queremos agregar más hechizos, tendríamos que modificar esta clase, lo cual viola el OCP.
  }
}

```

El problema con este diseño es que cada vez que queremos agregar un nuevo hechizo, necesitamos modificar la clase Mage, lo cual va en contra del OCP.

Entonces, como podría verse mejor:

```Typescript
interface Spell {
    cast(mageName: string): string;
}

class Fireball implements Spell {
    cast(mageName: string): string {
        return `${mageName} lanza una bola de fuego!`;
    }
}

class Frostbolt implements Spell {
    cast(mageName: string): string {
        return `${mageName} lanza un rayo de hielo!`;
    }
}

class Mage {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    castSpell(spell: Spell): string {
        return spell.cast(this.name);
    }
}


```

## Liskov Substitution Principle

Según este principio, los objetos de una superclase deben poder ser reemplazados por objetos de una subclase sin afectar la corrección del programa. Es esencialmente una definición más precisa del comportamiento esperado de la herencia.

Ejemplo:

Supongamos que tengas una clase base Notification que tiene un método send:

```Typescript
class Notification {
    constructor(private message: string) {}

    send() {
        console.log(`Enviando: ${this.message}`);
    }
}

class EmailNotification extends Notification {
    constructor(private message: string, private emailAddress: string) {
        super(message);
    }

    sendEmail() {
        console.log(`Enviando email a ${this.emailAddress}: ${this.message}`);
    }
}

class SMSNotification extends Notification {
    constructor(private message: string, private phoneNumber: string) {
        super(message);
    }

    sendSMS() {
        console.log(`Enviando SMS a ${this.phoneNumber}: ${this.message}`);
    }
}

class NotificationService {
    // @ts-ignore
    sendNotification(notifications: Notification[]) {
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

class UserService {
    notificationService: NotificationService;

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

```

El problema aquí es que, aunque EmailNotification extiende Notification, tiene un nuevo método sendEmail que requiere un parámetro adicional (emailAddress). Esto significa que no puedes usar EmailNotification en lugares donde esperarías usar Notification, ya que el método de envío tiene una firma diferente. Esto viola el LSP.

Refactorizando...

Para respetar el LSP, asegurémonos de que las subclases no cambien la firma del método de la superclase

```Typescript
interface AppNotification {
    send(): void;
}

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
```

## Interface Segregation Principle

Este principio sostiene que una clase no debería ser forzada a implementar interfaces que no utiliza. En otras palabras, es mejor tener varias interfaces específicas en lugar de una única interface genérica.

Nota: Esto también puede ayudara a definir comportamientos y separarlos

Supongamos que tienes una interfaz Worker que representa a alguien que trabaja en una empresa:

```Typescript
interface Worker {
  work(): void;
  eat(): void;
}

class Developer implements Worker {
  work(): void {
    // código para programar
  }

  eat(): void {
    // código para comer
  }
}

class Robot implements Worker {
  work(): void {
    // código para construir cosas
  }

  eat(): void {
    // ¡Los robots no comen!
    throw new Error("No puedo comer");
  }
}

```

La interfaz Worker tiene métodos tanto para trabajar como para comer. Esto tiene sentido para un Developer, pero no para un Robot. En este diseño, un Robot tiene que implementar el método eat(), incluso cuando no tiene sentido para él, lo que viola el ISP.

Podemos corregir esto segregando la interfaz Worker en dos interfaces diferentes:

```Typescript
interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

class Developer implements Workable, Eatable {
  work(): void {
    // código para programar
  }

  eat(): void {
    // código para comer
  }
}

class Robot implements Workable {
  work(): void {
    // código para construir cosas
  }

  // No se necesita implementar eat() porque Robot no implementa Eatable
}

```

En este diseño, Developer implementa tanto Workable como Eatable, ya que los desarrolladores pueden trabajar y comer. Sin embargo, Robot solo implementa Workable porque solo puede trabajar y no necesita preocuparse por el método eat().

Este diseño respeta el ISP porque garantiza que las clases solo necesiten preocuparse por los métodos que realmente usan, en lugar de implementar una interfaz "todo en uno" que podría no ser relevante para todas las clases que la implementan.

Otro ejemplo:

```Typescript
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

class UserService {
    constructor(private notificationService: NotificationService) {}

    // @ts-ignore
    sendVerificationCode({ name, email, phoneNumber }) {
        const smsNotification: SMSNotificationApp = new SMSNotificationApp();
        // Generate code authentication and send it
        this.notificationService.sendNotification([smsNotification]);

        const emailNotification: EmailNotificationApp =
            new EmailNotificationApp();

        const slackNotification: SlackNotificationApp =
            new SlackNotificationApp();
        // Alert users for this and some system information
        this.notificationService.sendAsyncNotification([
            emailNotification,
            slackNotification,
        ]);
    }
}

```

## Dependency Inversion Principle

Este principio establece que:

    1. Las entidades de alto nivel no deben depender de entidades de bajo nivel. Ambas deben depender de abstracciones.
    2. Las abstracciones no deben depender de los detalles. Los detalles deben depender de las abstracciones.

Esto significa que en lugar de escribir código que dependa de detalles específicos, debemos escribir código que dependa de interfaces o abstracciones, lo que hace que el sistema sea más modular y flexible.

```Typescript
class EmailService {
  sendEmail(message: string, recipient: string) {
    // lógica para enviar un correo electrónico
  }
}

class Notifier {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  notify(message: string) {
    this.emailService.sendEmail(message, "some@email.com");
  }
}

```

Aquí, la clase Notifier está directamente acoplada a la implementación específica de EmailService. Esto significa que si quisieras cambiar la forma en que envías notificaciones (por ejemplo, a través de un SMS o una notificación push), tendrías que hacer cambios significativos en Notifier.

Vamos a refactorizar el código anterior para que dependa de una abstracción en lugar de un detalle específico:

```Typescript
interface NotificationService {
  send(message: string, recipient: string): void;
}

class EmailService implements NotificationService {
  send(message: string, recipient: string) {
    // lógica para enviar un correo electrónico
  }
}

class SMSService implements NotificationService {
  send(message: string, recipient: string) {
    // lógica para enviar un SMS
  }
}

class Notifier {
  private service: NotificationService;

  constructor(service: NotificationService) {
    this.service = service;
  }

  notify(message: string) {
    this.service.send(message, "some@recipient.com");
  }
}

```

En este ejemplo, Notifier ya no depende directamente de EmailService. En su lugar, depende de la abstracción NotificationService. Esto permite que Notifier pueda trabajar con cualquier servicio que implemente esa interfaz, ya sea EmailService, SMSService o cualquier otro servicio que puedas agregar en el futuro.

Esto hace que el sistema sea mucho más flexible y que pueda adaptarse a cambios con menor esfuerzo, ya que las dependencias están invertidas: en lugar de que las clases de alto nivel dependan de clases de bajo nivel, ambas dependen de abstracciones.

```Typescript

```
