const express = require('express');
const router = express.Router();
const {
    getCVs,
    getCVById,
    createCV,
    updateCV,
    deleteCV
} = require('../controllers/cvController');

router.route('/')
    .get(getCVs)
    .post(createCV);

router.route('/:id')
    .get(getCVById)
    .put(updateCV)
    .delete(deleteCV);

module.exports = router;
