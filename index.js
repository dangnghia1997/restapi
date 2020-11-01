const http = require("http");
const hostname = "127.0.0.1";
const port = 4000;
const basicWebServer = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`<h1>Hello World!</h1><h2>Item List</h2>
            <ul>
            <li style="color: red">Item 1</li>
            </ul>
            <h2>Add Item</h2>
            <form>
            <label for="item">Item: </label>
            <input type="text">
            </br>
            <input type="Submit" value="SUBMIT">
            </form>`
    );
});
basicWebServer.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});