const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Submit feedback anonymously
router.post('/', async (req, res) => {
    try {
        const { teacherName, rating, comment } = req.body;

        const feedback = new Feedback({ teacherName, rating, comment });
        await feedback.save();

        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error submitting feedback' });
    }
});

// Get all feedback for a teacher
router.get('/:teacherName', async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ teacherName: req.params.teacherName });
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching feedback' });
    }
});

module.exports = router;
