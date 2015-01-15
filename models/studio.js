var mongoose = require('mongoose');

var studioSchema = mongoose.Schema({
    name: String,
    fullAddress: {
        city: String,
        district: String,
        undergroundStation: String,
        address: String
    },
    phones: String,
    email: String,
    website: String,
    description: String
});

module.exports =  mongoose.model('Studio', studioSchema);