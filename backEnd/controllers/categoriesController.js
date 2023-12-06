const { Category }  = require('../models');

const getAllCategories = async (req, res) => {
    try {
        const category = await Category.find();
        res.json(category);
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

        const category = await Category.find({ title: { $regex: new RegExp(name, 'i') } });
        res.json(category);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getOneCategory(req, res) {
    try {
        const id = req.params.id;
        const category = await Category.findById(id);
        if (category) {
            return res.json(category);
        }
        return res.status(404).send("Category with this id doesn't exist");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function createCategory(req, res) {
    try {
        const category = new Category(req.body);
        await category.save();
        return res.status(201).json({
            category
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

async function updateCategory(req, res) {
    try {
        const id = req.params.id;
        const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
        if (category) {
            return res.status(200).json(category);
        }
        throw new Error('Category not found');
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

async function deleteCategory(req, res) {
    try {
        const id = req.params.id;
        const category =  await Category.findByIdAndDelete(id);
        if (category) {
            return res.status(200).json(category);
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
