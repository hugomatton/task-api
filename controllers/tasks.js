const Task = require('../models/Task.js')
const asyncWrapper = require('../middleware/async.js')
const {createCustomError} = require('../errors/custom-error.js')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ success: true, data: { tasks, amount: tasks.length } })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ success: true, data: { task } })
})

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
        return next(createCustomError('Not found', 404))
    }
    res.status(200).json({ success: true, data: { task } })
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndUpdate(
        { _id: taskID },
        req.body,
        {
            new: true,
            runValidators: true
        }
    )
    if (!task) {
        return next(createCustomError('Not found', 404))
    }
    res.status(200).json({ success: true, data: { task } })

})

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })
    if (!task) {
        return next(createCustomError('Not found', 404))
    }
    res.status(200).json({ success: true, data: { task } })
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}