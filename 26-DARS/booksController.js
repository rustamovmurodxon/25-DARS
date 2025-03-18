import fs from 'fs/promises';
const FILE_PATH = './books.json';

async function readBooks() {
    try {
        const data = await fs.readFile(FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function writeBooks(books) {
    await fs.writeFile(FILE_PATH, JSON.stringify(books, null, 2));
}

export async function getBooks(req, res) {
    const books = await readBooks();
    res.json(books);
}

export async function getBookById(req, res) {
    const books = await readBooks();
    const book = books.find(b => b.id === parseInt(req.params.id));
    book ? res.json(book) : res.status(404).json({ message: "Kitob topilmadi" });
}
export async function addBook(req, res) {
    const books = await readBooks();
    const newBook = { id: Date.now(), ...req.body };
    books.push(newBook);
    await writeBooks(books);
    res.status(201).json(newBook);
}
export async function updateBook(req, res) {
    const books = await readBooks();
    const index = books.findIndex(b => b.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: "Kitob topilmadi" });
    }

    books[index] = { ...books[index], ...req.body };
    await writeBooks(books);
    res.json(books[index]);
}
export async function deleteBook(req, res) {
    let books = await readBooks();
    const filteredBooks = books.filter(b => b.id !== parseInt(req.params.id));

    if (books.length === filteredBooks.length) {
        return res.status(404).json({ message: "Kitob topilmadi" });
    }

    await writeBooks(filteredBooks);
    res.json({ message: "Kitob o‘chirildi" });
}
