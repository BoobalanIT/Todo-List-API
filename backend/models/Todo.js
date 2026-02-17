const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [50, 'Title can not be more than 50 characters']
    },
    description: {
        type: String,
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Todo', TodoSchema);
