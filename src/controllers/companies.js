/**
 * Import Mongoose
 */
const ODM = require('mongoose');

/** Import JSON data from local file */
const companies = require('../../companies.json');

/**
 * Models
 * [1] Companies
 */
const Company = require('../models/Companies');

/**
 * Companies
 *     `index()`
 *     `getById()`
 *     `create()`
 *     `update()`
 *     `remove()`
 */
const Controller = {
    index: (request, response) => {
        Company
            .find()
            .exec()
            .then(companies => {
                response
                    .json({
                        companies
                    })
                    .status(200);
            })
            .catch(error => console.log(error));
    },
    getById: (request, response) => {
        /**
         * [1] Access the `companyId` from URL through `request.params` 
         * object.
         * [2] Filter data and return if the companyId exists.
         */
        const { companyId } = request.params;
        const company = companies.data.filter(company => company.id ===
            parseInt(companyId));

        response
            .json({
                data: company
            })
            .status(200);
    },
    create: (request, response) => {
        const newCompany = new Company({
            _id: new ODM.Types.ObjectId(),
            name: request.body.name
        });

        newCompany
            .save()
            .then(newRecord => {
                response
                    .json({
                        type: 'POST Request',
                        data: newRecord
                    })
                    .status(201);
            })
            .catch(error => console.log(error));
    },
    update: (request, response) => {
        response
            .json({
                type: 'PUT Request'
            })
            .status(200);
    },
    remove: (request, response) => {
        response
            .json({
                type: 'DELETE Request'
            })
            .status(200);
    }
};

module.exports = Controller;