const mongoose = require ("mongoose");

const contactSchema = mongoose.Schema ({

    name:{
        type: String,
        required: [true, "name is required"],
    },

    email:{
        type: String,
        required: [true, "email is required"],
    },

    phone:{
        type: String,
        required: [true, "phone is required"],
    },
},
    {
        timestamps: true,
    }
    
);
 
const Contact = mongoose.model ("Contact", contactSchema);
module.exports = Contact;