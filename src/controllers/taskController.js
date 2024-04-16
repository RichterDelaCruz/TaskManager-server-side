// taskController.js

const { pool } = require('../database');

const taskController = {
    // Create a new task
    async createTask(req, res) {
        const { title, status } = req.body;
        try {
            await pool.query('INSERT INTO tasks (title, status) VALUES (?, ?)', [title, status]);
            res.status(201).send('Task added successfully');
        } catch (error) {
            console.error('Error adding task:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    // Get all tasks
    async getAllTasks(req, res) {
        try {
            const [tasks] = await pool.query('SELECT * FROM tasks');
            res.json(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    // Get task by ID
    async getTaskById(req, res) {
        const taskId = req.params.id;
        try {
            const [task] = await pool.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
            if (task.length === 0) {
                res.status(404).send('Task not found');
            } else {
                res.json(task[0]);
            }
        } catch (error) {
            console.error('Error fetching task:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    // Update a task
    async updateTask(req, res) {
        const taskId = req.params.id;
        const { status } = req.body; // Only extract the status from the request body
        try {
            await pool.query('UPDATE tasks SET status = ? WHERE id = ?', [status, taskId]); // Update only the status field
            res.send('Task updated successfully');
        } catch (error) {
            console.error('Error updating task:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    // Delete a task
    async deleteTask(req, res) {
        const taskId = req.params.id;
        try {
            await pool.query('DELETE FROM tasks WHERE id = ?', [taskId]);
            res.send('Task deleted successfully');
        } catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = taskController;
