const express = require('express');
const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
} = require('../controllers/todos');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getTodos)
    .post(createTodo);

router.route('/:id')
    .put(updateTodo)
    .delete(deleteTodo);

module.exports = router;
