const express = require("express")
const route = express.Router()
const { addContact, addManyContact, getContactDetails, updateContact, deleteContact, liveSearch, getAllContact } = require("../controllers/contacts.controller.")

route.post("/add-contact", addContact)
route.post("/add-many-contact", addManyContact)
route.get("/contact", getContactDetails)
route.patch("/update-contact", updateContact)
route.delete("/delete-contact", deleteContact)
route.get("/live-search", liveSearch)
route.get("/", getAllContact)

module.exports = route