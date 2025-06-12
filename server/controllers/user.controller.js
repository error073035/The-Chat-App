const User = require("../models/user.model.js");
const asyncHandler = require("../utilities/asyncHandler.utility.js");
const ErrorHandler = require("../utilities/errorHandler.utility.js");

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const register = asyncHandler((async (req, res, next) => {
  const { fullName, username, password, gender } = req.body;

  if (!fullName || !username || !password || !gender) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const user = await User.findOne({ username });
  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const avatarType = gender === "male" ? "boy" : "girl";
  const avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${username}`;

  const newUser = await User.create({
    username,
    fullName,
    password: hashedPassword,
    gender,
    avatar,
  });

  console.log(username, fullName);

  const tokenData = {
    _id: newUser?._id,
  };
  console.log(tokenData);

  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  console.log(token);

  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      responseData: {
        newUser,
        token,
      },
    });
}));

const login = asyncHandler((async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(
      new ErrorHandler("Please enter a valid username or password", 400)
    );
  }

  const user = await User.findOne({ username });
  if (!user) {
    return next(
      new ErrorHandler("Please enter a valid username or password", 400)
    );
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return next(
      new ErrorHandler("Please enter a valid username or password", 400)
    );
  }

  const tokenData = {
    _id: user?._id,
  };

  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      responseData: {
        user,
        token,
      },
    });
}));

const getProfile = asyncHandler((async (req, res, next) => {
  const userId = req.user._id;

  const profile = await User.findById(userId);

  res.status(200).json({
    success: true,
    responseData: profile,
  });
}));

const logout = asyncHandler((async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logout successfull!",
    });
}));

const getOtherUsers = asyncHandler((async (req, res, next) => {
  const otherUsers = await User.find({ _id: { $ne: req.user._id } });

  res.status(200).json({
    success: true,
    responseData: otherUsers,
  });
}));



module.exports = {
  register,
  login,
  getProfile,
  logout,
  getOtherUsers
};