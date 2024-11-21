const mongoose = require('mongoose')
const campSchema = new mongoose.Schema({

date:{
    type: String,
    required: true,
},

title:{
    type: String
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
})

const organisationCamp = mongoose.model('camp', campSchema);
module.exports = organisationCamp


