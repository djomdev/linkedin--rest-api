//Import  the modules
const express = require('express');
const fs = require('fs');
const chalk = require('chalk');
const logger = require('morgan');

/** [0] Express class into app variable */
const app = express();
const PORT = process.env.PORT || 3000;

/* Absolute Path to HTML file */
const indexFile = `${ __dirname }/index.html`;

/**
 * [X] Middlewares
 * Runs before each request hit the routes configuration.
 * 
 * [X] Logs all requests
 * 
 */
 app.use(logger('dev'));

 /**
  * [X] Routes
  * 'app.use' it's called every time a request is sent to the server.
  */
app.get('/api', (request, response) => {
    response.send('LinkedIn REST API').status(200);
});

app.get('/', (request, response) => {
    response.sendFile(indexFile);
});

/**
 * [X] 404 Not Found
 * Catch the error.
 * 
 * `app.use` it's called everytime a request has been sent to the server.
 */
app.use((request, response, next) => {
    const ERROR_404 = {
        error: {
            message: 'The requested resource is not defined.',
            status: 404
        }
    };
    next(ERROR_404);
});

/**
 * [X] 500 Internal Error Server
 * Catch the error
 */
app.use((error, request, response, next) => {
    const body = error.error;
    const STATUS_CODE = body.status || 500;
    const ERROR_505 = body.message || '500. Internal Server Error';

    const formatedMessage = JSON.stringify(error, null, 2);

    response
        .status(STATUS_CODE)
        .json({
            error: {
                message: ERROR_505,
                status: STATUS_CODE
            }
        });
        console.log(chalk.red(formatedMessage));
});


 /**
  * Run and listen the server on a specific port.
  */

  app.listen(PORT, () => {
      const formatedMessage = chalk.green(`Express server running on PORT: ${ PORT }`);

      console.log(formatedMessage);
  });