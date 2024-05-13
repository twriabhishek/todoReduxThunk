const User = require("../models/user.model");
const { setUser, getUser } = require("../utils/auth.utils");

const handleloginAuth = async (req, res) => {
  const { email, password } = req.body;
  // Check if any required field is missing or blank
  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the password stored in the database
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = setUser(user);

    // Set the token as a cookie
    res.cookie("token", token, { httpOnly: true, secure: true });

    // Send a success response
    return res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    // Handle any errors
    console.error("Error occurred during signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handlesignupAuth = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  // console.log(firstName, lastName, email, password, phoneNumber);
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phoneNumber ||
    firstName.trim() === "" ||
    lastName.trim() === "" ||
    email.trim() === "" ||
    password.trim() === "" ||
    phoneNumber.trim() === ""
  ) {
    return res.status(404).json({ error: "All fields are required" });
  }

  try {
    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If user exists, send a response indicating that the user already exists
      return res.status(400).json({ error: "User already exists" });
    }
    await User.create({ firstName, lastName, email, password, phoneNumber });
    return res.status(201).json({ msg: "User Created Successfully" });
  } catch (error) {
    console.error("Error occurred during signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handlelogoutAuth = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ error: "No token found" });
    }
    // Clear the token cookie
    res.clearCookie("token", { httpOnly: true, secure: true });
    return res.status(200).json({ message: "Logout Successfully" });
    
  } catch (error) {
    // Handle any errors
    console.error("Error occurred during logout:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleloginAuth,
  handlesignupAuth,
  handlelogoutAuth,
};
