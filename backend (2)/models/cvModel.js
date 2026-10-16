const mongoose = require('mongoose');

const cvSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    education: { type: String },
    skills: { type: [String] },
    experience: { type: String }
}, {
    timestamps: true
});

const CV = mongoose.model('CV', cvSchema);

module.exports = CV;
