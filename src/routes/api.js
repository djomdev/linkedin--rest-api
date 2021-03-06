/**
 * Import Router from `express.js`.
 * 
 * Router will help us to creat endpoints using shortcuts like:
 *      `get()`
 *      `post()`
 *      `put()`
 *      `delete()`
 */
const { Router } = require('express');

/** Initialize and create a Router instance */
const app = Router();

/**
 * Controllers
 * 
 * They will help us to write our logic in a seperated file to keep clean our routes configuration file.
 * 
 * [1] Companies
 */
const Companies = require('../controllers/companies');

/**
 * Endpoints
 * 
 * [1] Companies
 *      `get(/companies)`
 *      `post(/companies)`
 *      `put(/companies)`
 *       `delete(/companies)`
 */
app.route('/companies')
    .get(Companies.index)
    .post(Companies.create)
    .put(Companies.update)
    .delete(Companies.remove);

app.get('/companies/:companyId', Companies.getById);

module.exports = app;