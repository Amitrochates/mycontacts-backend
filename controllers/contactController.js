const asyncHandler = require ("express-async-handler");
const Contact = require("../models/contactModel");
//@desc get all contacts
//@route GET /api/contacts
//@acces public

const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json({contacts});

});

//@desc create contact
//@route POST /api/contacts
//@acces public

const createContact = asyncHandler(async (req,res)=>{
    console.log("the contact is:", req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone)
    {
        res.status(400);
        throw new Error("Name email and phone required");
    }
    const contact = await Contact.create(
        {
            name,
            email,
            phone,
        }
    );
    res.status(201).json({contact});
});
//@desc  show contact
//@route GET /api/contacts/:id
//@acces public

const showContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error ("contact not found");
    }
    res.status(200).json({contact});
});

//@desc delete contact
//@route DELETE /api/contacts/:id
//@acces public

const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error ("contact not found");
    }
    await Contact.findByIdAndRemove(req.params.id);
     console.log("contact.remove");
    res.status(200).json(contact);
});

//@desc update contact
//@route PUT /api/contacts
//@acces public

const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error ("contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    console.log("contact.update")
    res.status(200).json({updatedContact});
});

module.exports = {getContact, createContact, showContact, deleteContact, updateContact};

