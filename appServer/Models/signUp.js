const mongoose = require('mongoose')
const { type } = require('os')

const bloodDonationSchema = new mongoose.Schema({
    organisationName:{
        type: String,
        required : true,
    },
    address:{
        streetAddress:{
            type: String,
            required: true,
        },
        city:{
            type: String,
            required: true,
        },
        district:{
            type: String,
            required: true,
        },
        block:{
            type: String,
            required: true,
        },
        zipCode:{
            type: Number,
            required: true,
        },
        state:{
            type: String,
            required: true,
        }
    },
    contact:{
        type: Number,
        required: true,
    },
    oid:{
        type: String, 
    }
})


const organisations = mongoose.model('organisation', bloodDonationSchema);

module.exports = organisations

