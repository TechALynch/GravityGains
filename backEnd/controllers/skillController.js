const { Skill }  = require('../models');

const getAllSkills = async (req, res) => {
    try {
        const events = await Skill.find();
        res.json(events);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const searchSkillsByName = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ error: 'Search name is required.' });
        }

        const events = await Skill.find({ name: { $regex: new RegExp(name, 'i') } });
        res.json(events);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getOneSkill(req, res) {
    try {
        const id = req.params.id;
        const event = await Skill.findById(id);
        if (event) {
            return res.json(event);
        }
        return res.status(404).send("Skill with this id doesn't exist");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function createSkill(req, res) {
    try {
        const event = new Skill(req.body);
        await event.save();
        return res.status(201).json({
            event
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

async function updateSkill(req, res) {
    try {
        const id = req.params.id;
        const event = await Skill.findByIdAndUpdate(id, req.body, { new: true });
        if (event) {
            return res.status(200).json(event);
        }
        throw new Error('Skill not found');
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

async function deleteSkill(req, res) {
    try {
        const id = req.params.id;
        const event =  await Skill.findByIdAndDelete(id);
        if (event) {
            return res.status(200).json(event);
        }
        throw new Error('Skill not found');
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

module.exports = {
    getAllSkills,
    searchSkillsByName,
    getOneSkill,
    createSkill,
    updateSkill,
    deleteSkill
}
