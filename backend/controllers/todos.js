const Todo = require('../models/Todo');

// @desc    Get all todos
// @route   GET /todos
// @access  Private
exports.getTodos = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;

        // Filter by user
        const query = { user: req.user.id };

        // Filtering
        if (req.query.title) {
            query.title = { $regex: req.query.title, $options: 'i' };
        }

        // Sorting
        let sort = '-createdAt'; // Default sort by newest
        if (req.query.sort) {
            sort = req.query.sort.split(',').join(' ');
        }

        const total = await Todo.countDocuments(query);
        const todos = await Todo.find(query)
            .sort(sort)
            .skip(startIndex)
            .limit(limit);

        res.status(200).json({
            data: todos,
            page,
            limit,
            total
        });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create new todo
// @route   POST /todos
// @access  Private
exports.createTodo = async (req, res, next) => {
    try {
        req.body.user = req.user.id;

        const todo = await Todo.create(req.body);

        res.status(201).json(todo);
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update todo
// @route   PUT /todos/:id
// @access  Private
exports.updateTodo = async (req, res, next) => {
    try {
        let todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Make sure user owns todo
        if (todo.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json(todo);
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete todo
// @route   DELETE /todos/:id
// @access  Private
exports.deleteTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Make sure user owns todo
        if (todo.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await todo.deleteOne();

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
