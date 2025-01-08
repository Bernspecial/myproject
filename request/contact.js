
const mongodb = require('../Database/connection');
const { ObjectId } = require('mongodb');

// Get all contacts
const getData = async (req, res, next) => {
    try {
        const result = await mongodb.getDb().db().collection('contacts').find();
        const lists = await result.toArray(); // Convert the cursor to an array
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists); // Return all contacts
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving contacts', error: error.message });
    }
};

// Get a single contact by ID
const getDataID = async (req, res, next) => {
    const contactId = req.params.id; // Get the ID from the route parameters
    try {
        const result = await mongodb.getDb().db().collection('contacts').findOne({ _id: new ObjectId(contactId) }); // Use ObjectId here
        
        if (!result) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result); // Return the found contact
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving contact', error: error.message });
    }
};

module.exports = { getData, getDataID };