const express = require ("express");
const router = express.Router();
const {getContact} = require("../controllers/contactController");
const {showContact} = require("../controllers/contactController")
const {deleteContact} = require("../controllers/contactController")
const {updateContact} = require("../controllers/contactController")
const {createContact} = require("../controllers/contactController")

router.route("/").get(getContact).post(createContact);


router.route("/:id").get(showContact).put(updateContact).delete(deleteContact);


module.exports=router;
