const express = require("express")
const route = express.Router()
const { contactObject } = require("../controllers/contacts.controller")

route.post("/add-contact", contactObject.addContact)
route.post("/add-many-contact", contactObject.addManyContact)
route.get("/contact", contactObject.getContactDetails)
route.patch("/update-contact", contactObject.updateContact)
route.delete("/delete-contact", contactObject.deleteContact)
route.get("/live-search", contactObject.liveSearch)
route.get("/", contactObject.getAllContact)

module.exports = route