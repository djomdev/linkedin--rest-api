//Import  the modules
const express = require('express');
const logger = require('morgan');
const chalk = require('chalk');

/** [0] Express class into app variable */
const app = express();
const PORT = process.env.PORT || 3000;

/**
 * [X] Views Configuration
 * 
 * [X] Set the `views` variable and pass the relative path
 * [X] Configure the template engine using `pug`
 */
app.set('views', './src/views');
app.set('view engine', 'pug');

/**
 * [X] Middlewares
 * Runs before each request hit the routes configuration.
 * 
 * [X] Logs all requests
 * 
 */
 app.use(logger('dev'));
 app.use('/static', express.static('public'));

 /**
  * [X] Routes
  * 'app.use' it's called every time a request is sent to the server.
  */
app.get('/api', (request, response) => {
    response.send('LinkedIn REST API').status(200);
});

/**
 * [X] `app.get('/')` will render a '.pug' file located in `src/views/main.pug`
 * [X] As a second param we are sending content using a JavaScript Object
 */
app.get('/', (request, response) => {
    response.render('main', {
        title: 'LinkedIn REST API',
        subtitle: 'API Reference'
    });
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
      const formatedMessage = `Express server running on PORT: ${ PORT }`;

      console.log(formatedMessage);
  });