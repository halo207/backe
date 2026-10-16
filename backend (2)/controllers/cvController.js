const CV = require('../models/cvModel');

// @desc    Get all CVs
// @route   GET /api/cvs
// @access  Public
const getCVs = async (req, res) => {
    try {
        const cvs = await CV.find();
        res.status(200).json(cvs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get CV by ID
// @route   GET /api/cvs/:id
// @access  Public
const getCVById = async (req, res) => {
    try {
        const cv = await CV.findById(req.params.id);
        if (cv) {
            res.status(200).json(cv);
        } else {
            res.status(404).json({ message: 'CV not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new CV
// @route   POST /api/cvs
// @access  Public
const createCV = async (req, res) => {
    try {
        const { name, email, phone, education, skills, experience } = req.body;
        
        const cv = new CV({
            name,
            email,
            phone,
            education,
            skills,
            experience
        });

        const createdCV = await cv.save();
        res.status(201).json(createdCV);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a CV
// @route   PUT /api/cvs/:id
// @access  Public
const updateCV = async (req, res) => {
    try {
        const { name, email, phone, education, skills, experience } = req.body;

        const cv = await CV.findById(req.params.id);

        if (cv) {
            cv.name = name || cv.name;
            cv.email = email || cv.email;
            cv.phone = phone || cv.phone;
            cv.education = education || cv.education;
            cv.skills = skills || cv.skills;
            cv.experience = experience || cv.experience;

            const updatedCV = await cv.save();
            res.status(200).json(updatedCV);
        } else {
            res.status(404).json({ message: 'CV not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a CV
// @route   DELETE /api/cvs/:id
// @access  Public
const deleteCV = async (req, res) => {
    try {
        const cv = await CV.findById(req.params.id);

        if (cv) {
            await cv.deleteOne();
            res.status(200).json({ message: 'CV removed' });
        } else {
            res.status(404).json({ message: 'CV not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCVs,
    getCVById,
    createCV,
    updateCV,
    deleteCV
};
