const { Category }  = require('../models');

const getAllCategories = async (req, res) => {
    try {
        const events = await Category.find();
        res.json(events);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const searchCategoriesByName = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ error: 'Search name is required.' });
        }

        const events = await Category.find({ title: { $regex: new RegExp(name, 'i') } });
        res.json(events);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getOneCategory(req, res) {
    try {
        const id = req.params.id;
        const event = await Category.findById(id);
        if (event) {
            return res.json(event);
        }
        return res.status(404).send("Category with this id doesn't exist");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function createCategory(req, res) {
    try {
        const event = new Category(req.body);
        await event.save();
        return res.status(201).json({
            event
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

async function updateCategory(req, res) {
    try {
        const id = req.params.id;
        const event = await Category.findByIdAndUpdate(id, req.body, { new: true });
        if (event) {
            return res.status(200).json(event);
        }
        throw new Error('Category not found');
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

async function deleteCategory(req, res) {
    try {
        const id = req.params.id;
        const event =  await Category.findByIdAndDelete(id);
        if (event) {
            return res.status(200).json(event);
        }
        throw new Error('Category not found');
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

module.exports = {
    getAllCategories,
    searchCategoriesByName,
    getOneCategory,
    createCategory,
    updateCategory,
    deleteCategory
}
