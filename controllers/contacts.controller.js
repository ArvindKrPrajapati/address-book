const contactsModal = require("../modals/contacts.modal")
const mongoose = require('mongoose');
class Contact {
    async addContact(req, res) {
        try {
            const { mobile, name } = req.body
            if (!mobile || !name) {
                return res.status(400).json({ success: false, error: "mobile number and name is required" })
            }
            if (isNaN(mobile)) {
                // check if mobile no is a number
                return res.status(400).json({ success: false, error: "invalid number (NaN)" })
            }

            if (mobile.toString().length === 10) {
                // is mobile no valid
                const data = await contactsModal.create({ mobile, name })
                return res.status(200).json({ success: true, data })

            } else {
                return res.status(400).json({ success: false, error: "invalid number , mobile number should be of 10 digits" })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, error: "server error" })
        }
    }

    async addManyContact(req, res) {
        try {
            const { contacts } = req.body
            if (contacts.length < 1) {
                return res.status(400).json({ success: false, error: "contacts array is required" })
            }
            const data = await contactsModal.insertMany(contacts)
            return res.status(200).json({ success: true, data })
        } catch (error) {
            return res.status(500).json({ success: false, error })
        }
    }

    async getContactDetails(req, res) {
        try {
            let mobile = req.query.mobile
            if (!mobile) {
                return res.status(404).json({ success: false, error: "mobile is not provided in query" })
            }
            const data = await contactsModal.find({ mobile })
            return res.status(200).json({ success: true, data })
        } catch (error) {
            return res.status(500).json({ success: false, error })
        }
    }

    async updateContact(req, res) {
        try {
            let _id = req.query.id
            const { mobile, name } = req.body
            if (!_id) {
                return res.status(404).json({ success: false, error: "id is not provided" })
            }
            if (!name && !mobile) {
                return res.status(404).json({ success: false, error: "mobile or name is required" })
            }
            if (isNaN(mobile)) {
                return res.status(400).json({ success: false, error: "invalid number (NaN)" })
            }

            if (mobile.toString().length !== 10) {
                return res.status(400).json({ success: false, error: "number should be equal to 10 digits" })
            }

            if (mongoose.Types.ObjectId.isValid(_id)) {
                _id = mongoose.Types.ObjectId(_id)
                const userInfo = await contactsModal.findOne({ _id })
                if (!userInfo) {
                    return res.status(404).json({ success: false, error: 'user not found' })
                }
                const data = await contactsModal.findByIdAndUpdate(_id, { mobile, name }, { new: true })
                return res.status(200).json({ success: true, data })

            } else {
                return res.status(401).json({ success: false, message: "invalid id" })
            }
        } catch (error) {
            return res.status(500).json({ success: false, error })
        }
    }

    async deleteContact(req, res) {
        try {
            let _id = req.query.id
            if (!_id) {
                return res.status(404).json({ success: false, error: "id is not provided" })
            }
            if (mongoose.Types.ObjectId.isValid(_id)) {
                _id = mongoose.Types.ObjectId(_id)
                const userInfo = await contactsModal.findOne({ _id })
                if (!userInfo) {
                    return res.status(404).json({ success: false, error: 'user not found' })
                }
                const data = await contactsModal.findByIdAndDelete(_id)
                return res.status(200).json({ success: true, data: { message: "deleted" } })

            } else {
                return res.status(401).json({ success: false, message: "invalid id" })
            }

        } catch (error) {
            return res.status(500).json({ success: false, error })
        }
    }

    async liveSearch(req, res) {
        try {
            let name = req.query.name || ''

            const data = await contactsModal.find({ name: { $regex: '^' + name, $options: 'i' } }).select("name mobile _id ").sort({ datetime: -1 })
            res.status(200).json({ success: true, data })
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "server error" })
        }
    }
    async getAllContact(req, res) {
        try {
            const page = Number(req.query.page) || 1
            if (page < 0) {
                return res.status(400).json({ success: false, error: "invalid page number" })
            }
            const limit = 20
            const skip = (page - 1) * limit

            const data = await contactsModal.find().select("name mobile _id ").sort({ datetime: -1 }).skip(skip).limit(limit)
            res.status(200).json({ success: true, page, amount: limit, data })
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "server error" })
        }
    }
}
const contactObject = new Contact()
module.exports = { contactObject }