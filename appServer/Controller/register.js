const register = require('../Models/signUp'); 
const { v4: uuidv4 } = require('uuid');

async function addOrganisation(req, res, next) {
    try {
        const organisationId = uuidv4();
        console.log('organisation-id', organisationId);
        console.log('body', req.body);

        const organisation = new register({
            organisationName: req.body.organisation,
            address: {
                streetAddress: req.body.streetAddress,
                city: req.body.city,
                district: req.body.district,
                block: req.body.block,
                zipCode: req.body.zipCode,
                state: req.body.state,
            },
            contact: req.body.contact,
            oid: organisationId, 
        });

        const addOrg = await organisation.save();

        res.status(200).json({
            status: 'Success',
            language: 'en-US',
            data: addOrg,
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({
            status: "Error",
            language: 'en-US',
            error: error.message, 
        });
    }
}

module.exports = { addOrganisation };
