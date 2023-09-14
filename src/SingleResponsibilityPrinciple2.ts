console.info("SOLID - 1 - Single Responsibility Principle");

// @ts-ignore
class Book {
    title: string;
    author: string;
    content: string;
}

class BookRepository {
    save(book: Book) {
        // código para guardar el libro en la base de datos
        console.log("Guardando el libro en la base de datos...", book);
    }
}
