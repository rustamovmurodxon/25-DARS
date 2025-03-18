const books = require('./data');

function getBooks(res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(books));
}

function addBook(req, res) {
    let body = "";
    req.on("data", chunk => { body += chunk.toString(); });
    req.on("end", () => {
        const newBook = JSON.parse(body);
        newBook.id = books.length + 1;
        books.push(newBook);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newBook));
    });
}

function deleteBook(req, res, id) {
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        books.splice(index, 1);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Kitob o'chirildi" }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Kitob topilmadi" }));
    }
}

module.exports = { getBooks, addBook, deleteBook };
