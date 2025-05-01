const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

// Add a new teacher
router.post('/', async (req, res) => {
    try {
        const { name, department, email, designation } = req.body;
        const teacher = new Teacher({ name, department, email, designation });
        await teacher.save();
        res.status(201).json({ message: 'Teacher added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding teacher', details: error.message });
    }
});

// Get all teachers
router.get('/', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching teachers' });
    }
});

// Get teacher by name
router.get('/:name', async (req, res) => {
    try {
        const teacher = await Teacher.findOne({ name: req.params.name });
        if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
        res.json(teacher);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching teacher' });
    }
});

module.exports = router;
