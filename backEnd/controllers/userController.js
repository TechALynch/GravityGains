const { User }  = require('../models');

const getAllUsers = async (req, res) => {
    try {
        const events = await User.find();
        res.json(events);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const searchUsersByName = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ error: 'Search name is required.' });
        }

        const events = await User.find({ name: { $regex: new RegExp(name, 'i') } });
        res.json(events);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getOneUser(req, res) {
    try {
        const id = req.params.id;
        const event = await User.findById(id);
        if (event) {
            return res.json(event);
        }
        return res.status(404).send("User with this id doesn't exist");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function createUser(req, res) {
    try {
        const event = new User(req.body);
        await event.save();
        return res.status(201).json({
            event
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

async function updateUser(req, res) {
    try {
        const id = req.params.id;
        const event = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (event) {
            return res.status(200).json(event);
        }
        throw new Error('User not found');
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

async function deleteUser(req, res) {
    try {
        const id = req.params.id;
        const event =  await User.findByIdAndDelete(id);
        if (event) {
            return res.status(200).json(event);
        }
        throw new Error('User not found');
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

// Function to get user by Auth0 ID
const getUserByAuth0Id = async (auth0Id) => {
    try {
      const user = await User.findOne({ auth0Id: auth0Id });
      return user;
    } catch (error) {
      throw error;
    }
  };

const getUserWithAuth0Id = async (req, res) => {
    try {
      const auth0Id = req.params.auth0Id;
      const user = await getUserByAuth0Id(auth0Id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Send back the user's ObjectId
      res.json({ _id: user._id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    getAllUsers,
    searchUsersByName,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    getUserByAuth0Id,
    getUserWithAuth0Id
}
