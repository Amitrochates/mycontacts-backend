const asyncHandler = require ("express-async-handler");
const User = require ("../models/userModel");
const jwt = require ("jsonwebtoken");
const bcrypt = require ("bcrypt");
//@desc register users
//@route POST /api/users/register
//@acces public

const registerUser = asyncHandler(async  (req,res)=>{
    const {username, email, password } = req.body;
    if (!username || !email || !password)
    {   
        res.status(400);
        throw new Error ("all fields are mandatory.");
    }

    const userAvailable = await User.findOne({email});
    if (userAvailable)
    {   
        res.status(400);
        throw new Error ("User already exists");
    }
    //hashing pwd
    const hashedPasswrod = await bcrypt.hash(password, 10);
    console.log ("Hashed Password:", hashedPasswrod);
    const user = await User.create({
        username,
        email,
        password: hashedPasswrod,
    });
    console.log(`user created ${user}`);
    if (user)
    {
        res.status(200).json({_id: user.id, email: user.email});
    }
    else {
        res.status(400);
        throw new Error ("entries invalid"); 
    }
    res.json({message: "register"})
    });

//@desc login users
//@route POST /api/users/login
//@acces public

const loginUser = asyncHandler(async (req,res)=>{
const {email, password} = req.body;
if (!email || !password)
{
    res.status(400);
    throw new Error ("all fields mandatory");
}

const user = await User.findOne({email}); 

if (user && (await bcrypt.compare (password, user.password)))
{  
     const accessToken = jwt.sign({
    user:{
        username: user.username,
        email: user.email,
        id: user.id,
    }
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
    expiresIn: "1m"
    }
    );
res.status(200).json({accessToken});
}
else 
{
    res.send(401);
    throw new Error ("Invalid credentials");
}


});

//@desc current user
//@route GET /api/users/current
//@acces private

const currentUser = asyncHandler(async  (req,res)=>{
res.json({message: "current user"})
});


module.exports = {registerUser, loginUser, currentUser};