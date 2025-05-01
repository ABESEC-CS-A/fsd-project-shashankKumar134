require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Teacher = require('../models/Teacher');
const Feedback = require('../models/feedback');

const seed = async () => {
    await connectDB();

    // Clear existing entries (optional)
    await Teacher.deleteMany();
    await Feedback.deleteMany();

    // Add teachers
    const teachers = await Teacher.insertMany([
        { name: 'Dr. A. Sharma', department: 'Computer Science', email: 'asharma@college.edu', designation: 'Associate Professor' },
        { name: 'Prof. B. Verma', department: 'Mathematics', email: 'bverma@college.edu', designation: 'Professor' },
        { name: 'Dr. C. Iyer', department: 'Physics', email: 'ciyer@college.edu', designation: 'Assistant Professor' },
    ]);

    console.log('✅ Teachers seeded:', teachers.length);

    // Add feedback
    const feedbacks = await Feedback.insertMany([
        { teacherName: 'Dr. A. Sharma', rating: 5, comment: 'Excellent teaching style!' },
        { teacherName: 'Prof. B. Verma', rating: 4, comment: 'Explains concepts well.' },
        { teacherName: 'Dr. C. Iyer', rating: 3, comment: 'Needs to slow down during lectures.' },
    ]);

    console.log('✅ Feedback seeded:', feedbacks.length);

    mongoose.disconnect();
};

seed();
