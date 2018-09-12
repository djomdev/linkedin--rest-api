//Import  the modules
const http = require('http');
const fs = require('fs');
const chalk = require('chalk');

/* Absolute Path to HTML file */
const indexFile = `${ __dirname }/index.html`;


/**
 * [1] Create and instantiate the Node server.
 * [2] The callback function will act like a Listener, it will execute each time
 *      a request is done.
 * 
 */

 const app = http.createServer((request, response) => {
    /**
     * [1] Read the file as a string.
     * [2] Send it in the response.
     * [3] Set the 'Status Code' and the 'Content-Type'.
     * [4] Finish the response
     */
    const string = fs.readFileSync(indexFile);

    response.write(string);
    response.writeHead(200, {
        "Content-Type": "text/html"
    });
 });

 /**
  * Run and listen the server on a specific port.
  */

  app.listen(3000, () => {
      const formatedMessage = chalk.green('Node server running on PORT: 3000');
      
      console.log(formatedMessage);
  })