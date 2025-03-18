const http = require('http');
const { getBooks, addBook, deleteBook } = require('./routes');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/books') {
        getBooks(res);
    } else if (req.method === 'POST' && req.url === '/books') {
        addBook(req, res);
    } else if (req.method === 'DELETE' && req.url.startsWith('/books/')) {
        const id = parseInt(req.url.split('/')[2]);
        deleteBook(req, res, id);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Sahifa topilmadi" }));
    }
});

server.listen(3000, () => {
    console.log('Server 3000-portda ishlayapti...');
});
