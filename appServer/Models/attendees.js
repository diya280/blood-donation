const mongoose = require('mongoose')
const attendeesSchema = new mongoose.Schema({

addDate:{
    type: Date,
    default: Date.now 
},
campId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'camp',
    required: true,
},
firstname:{
    type: String,
    required: true,
},
lastname:{
    type: String,
    required: true,
},
bloodGroup:{
    type: String,
    required: true,
},
quantity:{
    type: String,
    required: true,
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
},
contact:{
    type: Number,
    required: true,
}
})

const addMember = mongoose.model('attendees', attendeesSchema);
module.exports = addMember




