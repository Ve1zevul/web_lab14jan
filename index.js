const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://ve1zuveel:9CSugLAZa71ph33W@cluster0.l25zy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDb connected');
    } catch (err) {
        console.error('Connection error:', err);
        process.exit(1);
    }
};

const Student = require('./models/Student');

const CRUD_Operations = async () => {

    const students = [
        { name: 'Grigorii Zhebakhanov', age: 20, major: 'Computer Science', enrolled: true },
        { name: 'Arseniy Kyuvashev', age: 22, major: 'Mathematics', enrolled: false },
        { name: 'Leonardo DaVinci', age: 20, major: 'Art', enrolled: true },
    ];
    await Student.insertMany(students);
    console.log('Students inserted!');

    const allStudents = await Student.find();
    console.log('All Students:', allStudents);

    const enrolledStudents = await Student.find({ enrolled: true });
    console.log('Enrolled Students:', enrolledStudents);

    const updatedStudent = await Student.findOneAndUpdate(
        { name: 'Arseniy Kyuvashev' },
        { major: 'Mathematics' },
        { new: true }
    );
    console.log('Updated Student:', updatedStudent);

    await Student.deleteOne({ name: 'Grigorii Zhebakhanov' });
    console.log('Grigorii Zhebakhanov deleted.');
};

CRUD_Operations();

connectDB();
