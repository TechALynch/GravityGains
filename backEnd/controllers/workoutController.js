const { Workout }  = require('../models');

const getAllWorkouts = async (req, res) => {
    try {
        const events = await Workout.find();
        res.json(events);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const searchWorkoutsByName = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ error: 'Search name is required.' });
        }

        const events = await Workout.find({ title: { $regex: new RegExp(name, 'i') } });
        res.json(events);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getOneWorkout(req, res) {
    try {
        const id = req.params.id;
        const event = await Workout.findById(id);
        if (event) {
            return res.json(event);
        }
        return res.status(404).send("Workout with this id doesn't exist");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function createWorkout(req, res) {
    try {
        const event = new Workout(req.body);
        await event.save();
        return res.status(201).json({
            event
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

async function updateWorkout(req, res) {
    try {
        const id = req.params.id;
        const event = await Workout.findByIdAndUpdate(id, req.body, { new: true });
        if (event) {
            return res.status(200).json(event);
        }
        throw new Error('Workout not found');
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

async function deleteWorkout(req, res) {
    try {
        const id = req.params.id;
        const event =  await Workout.findByIdAndDelete(id);
        if (event) {
            return res.status(200).json(event);
        }
        throw new Error('Workout not found');
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

module.exports = {
    getAllWorkouts,
    searchWorkoutsByName,
    getOneWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
}
