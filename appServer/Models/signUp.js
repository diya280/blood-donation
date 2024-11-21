const mongoose = require('mongoose')

const bloodDonationSchema = new mongoose.Schema({
    organisationName:{
        type: String,
        required : true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
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
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    oid:{
        type: String, 
    }
})


const organisations = mongoose.model('organisation', bloodDonationSchema);
module.exports = organisations

