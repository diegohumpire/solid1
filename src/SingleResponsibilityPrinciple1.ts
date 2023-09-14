console.info("SOLID - 1 - Single Responsibility Principle");

// @ts-ignore
class Book {
    title: string;
    author: string;
    content: string;

    constructor(title: string, author: string, content: string) {
        this.title = title;
        this.author = author;
        this.content = content;
    }

    // TODO: Refactor this method to a new class
    saveToDatabase() {
        // código para guardar el libro en la base de datos
        console.log("Guardando el libro en la base de datos...");
    }
}
