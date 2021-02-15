const db = require("../models");
const User = db.users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
var secretkey = 'archindiadggdgdgdterfgfchfhcvbfgdf';
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstname) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    dob: req.body.dob,
    gender: req.body.gender,
  });

  // Save Tutorial in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};



exports.register = async (req, res) => {
  try {
    // let { email, password, passwordCheck, displayName } = req.body;
    let { firstname, lastname, email, password, dob, gender, displayName } = req.body;

    // validate
    if (!email || !password || !firstname || !lastname || !dob || !gender)
      return res.status(400).json({ status:false,msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ status:false,msg: "The password needs to be at least 5 characters long." });


    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ status:false,msg: "An account with this email already exists." });


    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: passwordHash,
      dob,
      gender
    });
    const savedUser = await newUser.save();
    const status = true;
    res.status(200)
    .json({savedUser:savedUser,status:true,msg:"Registration Successfully"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.login = async (req, res) => {
  // console.log(`aaaaaaa`, req.body);
  try {
    // console.log(`try`);
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ status:false,msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ status:false,msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ status:false,msg: "Invalid email or password." });
    // process.env.JWT_SECRET


    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "120s" }
    );
    res.json({
      status:true,
      token,
      user: {
        id: user._id,
        email:email,
        password:password
        // displayName: user.displayName,
      },
    });
  } catch (err) {
    // console.log(`catch`,err);
    res.status(500).json({ error: err.message });
  }
}

exports.tokenIsValid = async (req, res) => {
  try {
    // const token = req.header("x-auth-token");'
    let token = req.get("authorization");

    // Remove Bearer from string
    token = token.slice(7);
    if (!token) return res.json(false);
    // process.env.JWT_SECRET

    const verified = await jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}




// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const firstname = req.query.firstname;
  var condition = firstname ? { firstname: { $regex: new RegExp(firstname), $options: "i" } } : {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "User not found" + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "User not found=" + id });
    });
};
