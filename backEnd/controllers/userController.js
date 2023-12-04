const { User }  = require('../models');
const jwt = require('jsonwebtoken');

// const createUser = async (req, res) => {
//     try {
//         const { password, ...userData } = req.body;
//         const user = new User({ ...userData, password });
//         await user.save();
//         return res.status(201).json({ user });
//     } catch (e) {
//         return res.status(500).json({ error: e.message });
//     }
// };

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token for successful authentication
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
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

        const users = await User.find({ name: { $regex: new RegExp(name, 'i') } });
        res.json(users);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getOneUser(req, res) {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (user) {
            return res.json(user);
        }
        return res.status(404).send("User with this id doesn't exist");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function createUser(req, res) {
    try {
        const user = new User(req.body);
        await user.save();
        return res.status(201).json({
            user
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

async function updateUser(req, res) {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (user) {
            return res.status(200).json(user);
        }
        throw new Error('User not found');
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

async function deleteUser(req, res) {
    try {
        const id = req.params.id;
        const user =  await User.findByIdAndDelete(id);
        if (user) {
            return res.status(200).json(user);
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
    getUserWithAuth0Id,
    login,

}
