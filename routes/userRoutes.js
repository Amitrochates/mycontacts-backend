const express = require ("express");
const router = express.Router();

const {registerUser, loginUser, currentUser} =  require ("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/current", validateToken, currentUser);
 
module.exports = router ;
