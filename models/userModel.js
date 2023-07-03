const mongoose = require ("mongoose");

const userSchema = mongoose.Schema(
    {
        
        username:{
            type: String,
            required:[true, "Name required"]

        },
        
        email:{
            type: String,
            required:[true, "email required"],
            unique:[true, "account already exists"]
        },
        password:{
            type: String,
            required:[true, "password required"]
            
        },
    },
    {
        timestamps: true,
    }
);
const User = mongoose.model ("User", userSchema);
module.exports = User; 