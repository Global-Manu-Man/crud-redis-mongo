import User from '../models/userModel.js';
import { getCache, setCache, deleteCache } from '../config/redis.js';

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    await setCache(`user:${user._id}`, JSON.stringify(user));
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try to get from cache first
    const cachedUser = await getCache(`user:${id}`);
    if (cachedUser) {
      return res.json(JSON.parse(cachedUser));
    }

    // If not in cache, get from DB and cache it
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await setCache(`user:${id}`, JSON.stringify(user));
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { 
      new: true, 
      runValidators: true 
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await setCache(`user:${id}`, JSON.stringify(user));
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await deleteCache(`user:${id}`);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};