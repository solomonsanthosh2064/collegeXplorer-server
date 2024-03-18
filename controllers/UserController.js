const bcrypt = require("bcrypt");
const User = require("../modals/user");

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, registerNumber, password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      registerNumber: registerNumber,
      userImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      className: className,
      email: email,
      password: hashedPassword,
      orders: [],
    });

    const savedUser = await newUser.save();
    // console.log("User created:", savedUser)
    res.json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Read all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("orders");
    // console.log("All users:", users)
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw error;
  }
};

// Read a user by ID
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ id }).populate("orders");
    res.json(user);
    // console.log("User by ID:", user)
  } catch (error) {
    console.error("Error retrieving user by ID:", error);
    throw error;
  }
};

// Read a user by Email
const getUserByEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("hi");
    const user = await User.findOne({ email }).populate("orders");
    res.json(user);
    // console.log("User by ID:", user)
  } catch (error) {
    console.error("Error retrieving user by ID:", error);
    throw error;
  }
};

const getUserByRegisterNumber = async (req, res) => {
  try {
    const registerNumber = req.params.registerNumber;
    const user = await User.findOne({
      registerNumber: registerNumber,
    }).populate("orders");
    res.json(user);
    // console.log("User by ID:", user)
  } catch (error) {
    console.error("Error retrieving user by ID:", error);
    throw error;
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, registerNumber, className, email, orders } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: name,

        email: email,
      },
      {
        new: true,
      }
    );
    // console.log("Updated user:", updatedUser)
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const updateClassForUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { className } = req.body;
    console.log(id, className);
    const updated = await User.findByIdAndUpdate(
      id,
      {
        className: className,
      },
      {
        new: true,
      }
    );
    // console.log("Updated user:", updatedUser)
    res.json(updated);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    // console.log("Deleted user:", deletedUser)
    res.json(deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByRegisterNumber,
  updateUser,
  updateClassForUser,
  deleteUser,
};
