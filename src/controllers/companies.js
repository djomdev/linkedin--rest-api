/** Import JSON data from local file */
const companies = require('../../companies.json');

/**
 * Companies
 *      `index`
 */
const Controller = {
    index: (request, response) => {
        response
            .json(companies)
            .status(200);
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
    }
};

module.exports = Controller;