import User from "../models/Users.js";

export const createUser =  async (req, res) => {
  try {
    const { name, email, age } = req.body;

  const requiredFields = ['name', 'email', 'age'];

for (const field of requiredFields) {
  if (!req.body[field]) {
    return res.status(400).json({ error: `Please provide the user's ${field}` });
  }
}

    // 1. Create a new instance of the User model
    const newUser = new User({
      name,
      email,
      age,
    });

    // 2. Save to the database
    // Mongoose handles ID generation (ObjectId) automatically
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    // Handle specific database errors (like duplicate emails)
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }

    res.status(500).json({ error: "Server error: " + error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    // These run in parallel to save time
    const [allUsers, totalCount] = await Promise.all([
      User.find().sort({ createdAt: -1 }),
      User.countDocuments()
    ]);

    res.status(200).json({
      "total Users": totalCount,
      users: allUsers
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users: " + error.message });
  }
};


export const getUser =  async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by the ID from the URL
    const user = await User.findById(userId);

    // If no user is found, Mongoose returns null
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    // Handle CastError (happens if the ID format is invalid/malformed)
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    res.status(500).json({ error: "Server error: " + error.message });
  }
};

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        
        // We take whatever is in the body. 
        // If req.body is { age: 25 }, only age updates.
        const updates = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updates }, 
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find the user by ID and remove them from the collection
        const deletedUser = await User.findByIdAndDelete(userId);

        // If the ID doesn't exist in the database
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ 
            message: 'User deleted successfully',
            deletedUser: {
                id: deletedUser._id,
                name: deletedUser.name
            }
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};