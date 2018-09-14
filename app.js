require('dotenv').config()

//Import  the modules
const express = require('express');
const logger = require('morgan');
const chalk = require('chalk');
const ODM = require('mongoose');

/** Import all the routes configuration */
const api = require('./src/routes/api');

/** [0] Express class into app variable */
const app = express();
const PORT = process.env.PORT || 3000;

/**
 * [1] Database
 * 
 * [1] Control the connection's string in a `process.env` variable
 */
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${ process.env.MONGODB_DATABASE }`;

/**
 * [1.1] Mongoose Connect
 * [1] Connect the API to MongoDB using `mongoose` and enable
 *  `useMongoClient`. 
 */
ODM.connect(MONGODB_URI, {
    useNewUrlParser: true
});

/**
 * [1.2] Mongoose Events
 * [1] Listen on `connected` Event and print a helper message in console
 */
ODM.connection.on('connected', () => {
    const formatedMessage = {
        host: process.env.MONGODB_PROVIDER,
        success: true
    };
    console.log(JSON.stringify(formatedMessage, null, 2));
});

/**
 * [2] Views Configuration
 * [1] Set the `views` variable and pass the relative path
 * [2] Configure the template engine using `pug`
 * [3] Render visually properly JSON data in the browser
 */
app.set('views', './src/views');
app.set('view engine', 'pug');
app.set('json spaces', 2);

/**
 * [3] Middlewares
 * Runs before each request hit the routes configuration.
 * 
 * [1] Logs all requests
 * [2] Define the static route to serve files from `/public`folder
 * [3] In order to read the body of a request, enable both JSON and URLEncoded formats
 */
 app.use(logger('dev'));
 app.use('/static', express.static('public'));

 /**
  * [4] Routes
  * [1] `app.get('/')` will render a `.pug` file located in `src/views/main.pug`
  * [2] As a second param we are sending content using a JavaScript Object
 */
app.get('/', (request, response) => {
    response.render('main', {
        title: 'LinkedIn REST API',
        subtitle: 'API Reference'
    });
});

/**
 * [5] CORS
 * 
 * Enable Cross-Origin-Resource-Sharing -CORS- and configure some common headers
 * in the response.
 */
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    next();
});

/**
 * [6] OPTIONS
 * 
 * Enable `OPTIONS` method for preflight requests.
 */
app.options('*', (request, response, next) => {
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    response.send(200);
    next();
});

/**
 * [7] Configure endpoints access through `/api` namespace
 */
app.use('/api/v1', api);

/**
 * [8] 404 Not Found
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
 * [9] 500 Internal Error Server
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
  * [10] Run and listen the server on a specific port.
  */

  app.listen(PORT, () => {
      const formatedMessage = `Express server running on PORT: ${ PORT }`;

      console.log(formatedMessage);
  });