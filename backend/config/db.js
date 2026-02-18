const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://boobalanvdevstudies_db_user:MwFWaZVFiEQBtGOA@cluster0.ss2ozc1.mongodb.net/?appName=Cluster0'
        );

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
