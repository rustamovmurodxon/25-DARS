import express from 'express';
import { getBooks, getBookById, addBook, updateBook, deleteBook } from './booksController.js';

const app = express();
app.use(express.json());

app.get('/books', getBooks);
app.get('/books/:id', getBookById);
app.post('/books', addBook);
app.put('/books/:id', updateBook);
app.delete('/books/:id', deleteBook);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server ${PORT}-portda ishlayapti...`);
});
