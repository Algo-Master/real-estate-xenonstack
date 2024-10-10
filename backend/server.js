const express = require("express");
const app = express();
const cors = require("cors");
const { DBConnection } = require("./database/db");
const User = require("./database/User");

const corsOptions = {
  origin: "http://localhost:5173",
  // allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  methods: "GET, POST, PUT, DELETE, OPTIONS", // Allowed HTTP methods
  // maxAge: 3600, // How long (in seconds) the options preflight request can be cached
};

app.options("*", cors(corsOptions)); // Allow preflight requests for all routes
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DBConnection();

app.get("/", (req, res) => {
  res.send(
    "Hi folks"
  );
});

// ----------------------- REGISTER -----------------------------------------

app.post("/register", async (req, res) => {
  try {
    console.log("Request recieved");
    // Get all the data from the frontend
    const { firstName, lastName, email, password } = req.body;

    // Check all the data exists or not
    if (!(firstName && lastName && email && password)) {
      return res.status(400).send("Please enter all the credentials");
    }

    //Add validations to phone number and email if u want

    // Check if user already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists with same email");
    }

    // Hash the password or Encrypt the Data
    const hashedpassword = await bcrypt.hash(password, 10);

    // Store the user in Database
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedpassword,
      role: "user",
      username: "defaultNoName",
    });

    // Generate a token for user and send it if required
    // const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
    //   expiresIn: "1h",
    // });
    // user.token = token;
    // user.password = undefined;
    res.status(200).json({
      success: true, // Sole change in the code from class.
      message: "You have successfully registered!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

app.post("/login", async (req, res) => {
  try {
    // Get all the data from the frontend
    const { email, password } = req.body;

    // Check all the data exists or not
    if (!(email && password)) {
      return res.status(400).send("Please enter all the details");
    }

    // Check if user already exists or not
    const existinguser = await User.findOne({ email }); // The User document is fetched here
    if (!existinguser) {
      return res.status(400).send("User not registered");
    }

    //Match the user entered password with the hashed password present in the database
    const pass = await bcrypt.compare(password, existinguser.password);
    if (!pass) {
      res.status(400).send("The login credentials doesn't match");
    }

    // Send the data
    res.status(200).cookie("token", token, options).json({
      message: "You have successfully logged in",
      success: true,
      existinguser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on the Port ${port}!!`);
});
