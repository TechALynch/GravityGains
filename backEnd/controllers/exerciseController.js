const { Exercise }  = require('../models');

const getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.json(exercises);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const searchExercisesByName = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ error: 'Search name is required.' });
        }
        const exercises = await Exercise.find({ name: { $regex: new RegExp(name, 'i') } });
        res.json(exercises);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getOneExercise = async (req, res) => {
    try {
        const id = req.params.id;
        const exercise = await Exercise.findById(id).populate('categories');
        if (exercise) {
            return res.json(exercise);
        }
        return res.status(404).send("Exercise with this id doesn't exist");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const createExercise = async (req, res) => {
    try {
        const exercise = new Exercise(req.body);
        await exercise.save();
        return res.status(201).json({
            exercise
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

const updateExercise = async (req, res) => {
    try {
        const id = req.params.id;
        const exercise = await Exercise.findByIdAndUpdate(id, req.body, { new: true });
        if (exercise) {
            return res.status(200).json(exercise);
        }
        throw new Error('Exercise not found');
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

const deleteExercise = async (req, res) => {
    try {
        const id = req.params.id;
        const exercise =  await Exercise.findByIdAndDelete(id);
        if (exercise) {
            return res.status(200).json(exercise);
        }
        throw new Error('Exercise not found');
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

module.exports = {
    getAllExercises,
    searchExercisesByName,
    getOneExercise,
    createExercise,
    updateExercise,
    deleteExercise
}


// const { Exercise }  = require('../models');

// const getAllExercises = async (req, res) => {
//     try {
//         const events = await Exercise.find();
//         res.json(events);
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// }

// const searchExercisesByName = async (req, res) => {
//     try {
//         const { name } = req.query;

//         if (!name) {
//             return res.status(400).json({ error: 'Search name is required.' });
//         }

//         const exercises = await Exercise.find({ name: { $regex: new RegExp(name, 'i') } });
//         res.json(exercises);
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// }

// async function getOneExercise(req, res) {
//     try {
//         const id = req.params.id;
//         const event = await Exercise.findById(id);
//         if (event) {
//             return res.json(event);
//         }
//         return res.status(404).send("Exercise with this id doesn't exist");
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// }

// async function createExercise(req, res) {
//     try {
//         const event = new Exercise(req.body);
//         await event.save();
//         return res.status(201).json({
//             event
//         });
//     } catch (e) {
//         return res.status(500).json({ error: e.message });
//     }
// }

// async function updateExercise(req, res) {
//     try {
//         const id = req.params.id;
//         const event = await Exercise.findByIdAndUpdate(id, req.body, { new: true });
//         if (event) {
//             return res.status(200).json(event);
//         }
//         throw new Error('Exercise not found');
//     } catch (e) {
//         return res.status(500).json({ error: e.message });
//     }
// }

// async function deleteExercise(req, res) {
//     try {
//         const id = req.params.id;
//         const event =  await Exercise.findByIdAndDelete(id);
//         if (event) {
//             return res.status(200).json(event);
//         }
//         throw new Error('Exercise not found');
//     } catch (e) {
//         return res.status(500).json({ error: e.message });
//     }
// }

// module.exports = {
//     getAllExercises,
//     searchExercisesByName,
//     getOneExercise,
//     createExercise,
//     updateExercise,
//     deleteExercise
// }
