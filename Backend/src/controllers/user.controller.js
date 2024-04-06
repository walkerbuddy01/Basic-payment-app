import asyncHandler from '../utils/asyncHandler.js'
// import { date, z } from "zod";
import ApiResponse from '../utils/apiResponse.js';
// import mongoose from 'mongoose';
import User from '../models/user.modal.js';
import { passwordHashing, verifyPassword } from '../utils/password.utils.js';
import { signinDetails, signupDetails, validateEmail, validateFirstName, validateLastName } from '../utils/authInputValidation.js';
import Balance from '../models/balance.model.js';


const generateRefreshAndAccessToken = async (userID) => {
  try {
    const user = await User.findById(userID);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken }
  } catch (error) {
    return `failed to generates the Access and refresh Token ${error.message} `
  }
}


const signUp = asyncHandler(async (req, res) => {
  const inputs = signupDetails.safeParse(req.body)
  if (!inputs.success) {
    return res.status(403).json(new ApiResponse(403, {}, "Invaild inputs "))
  }

  const { username, email, firstName, lastName, password } = inputs.data;

  if (username) {
    const existedUserWithSameUserName = await User.findOne({ username });
    if (existedUserWithSameUserName) {
      return res.status(401).json(new ApiResponse(401, {}, "user exist with this username"))
    }
    if (email) {
      const existedUserWithSameEmail = await User.findOne({ email });
      if (existedUserWithSameEmail) {
        return res.status(401).json(new ApiResponse(401, {}, "user exist with this email"))
      }
    }
  }

  const hashedPassword = await passwordHashing(password);

  const newUser = await User.create({
    username,
    email,
    firstName,
    lastName,
    password: hashedPassword,
  })

  const createdUser = await User.findById(newUser?._id).select(
    "-password"
  );

  if (!createdUser) {
    return res.status(500).json(new ApiResponse(500, {}, "Failed to create the user!"))
  }

  await Balance.create({
    user: createdUser._id,
    balance: 1 + Math.random() * 10000,
  })

  return res.status(200).json(new ApiResponse(200, createdUser, "User created succesfully !"))


})

const signIn = asyncHandler(async (req, res) => {
  const inputs = signinDetails.safeParse(req.body);

  if (!inputs.success) {
    return res.status(403).json(new ApiResponse(403, {}, "Invaild inputs "))
  }

  if (req.cookie?.accessToken) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "user is already loggedIn "))
  }

  const { username, password } = inputs.data;

  const userExists = await User.findOne({ username })

  if (!userExists) {
    return res.status(404).json(new ApiResponse(404, {}, "User with this username doesn't exists"))
  }

  const isPasswordCorrect = await verifyPassword(password, userExists.password);

  if (!isPasswordCorrect) {
    return res.status(403).json(new ApiResponse(403, {}, "Wrong password"))
  }

  const { refreshToken, accessToken } = await generateRefreshAndAccessToken(userExists._id);

  if (!refreshToken || !accessToken) {
    return res.status(500).json(new ApiResponse(500, {}, "Failed to generates the refresh or access token"))
  }



  const updatedUser = await User.findById(userExists._id).select("-password")

  const options = {
    httpOnly: true,
    secure: true,

  }
  if (updatedUser.refreshToken !== refreshToken) {
    return res.status(500).json(new ApiResponse(500, {}, "Internal Server Error! Failed to generate tokens"))
  }

  return res.status(200).cookie("refreshToken", refreshToken).cookie("accessToken", accessToken).json(new ApiResponse(200, updatedUser, "User logged In successfully "))
})

const updateContent = asyncHandler(async (req, res) => {

  const { firstName, lastName, email } = req.body;
  const isEmailValid = validateEmail.safeParse(email)
  const { _id } = req.user;



  const updateDetails = async (detail) => {
    const user = await User.findByIdAndUpdate(_id,
      detail
      , {
        new: true
      }).select("-password")
    return user;
  }

  if (firstName && lastName && email) {
    if (!isEmailValid.success) {
      return res.status(403).json(new ApiResponse(403, {}, "Please send valid email format"))
    }
    const updatedUser = await updateDetails({ firstName, lastName, email })
    return res.status(200).json(new ApiResponse(200, updatedUser, "User updated successfully"))
  }


  if (firstName && lastName) {
    const updatedUser = await updateDetails({ firstName, lastName })
    return res.status(200).json(new ApiResponse(200, updatedUser, "User updated successfully"))
  }
  if (firstName && email) {
    if (!isEmailValid.success) {
      return res.status(403).json(new ApiResponse(403, {}, "Please send valid email format"))
    }
    const updatedUser = await updateDetails({ firstName, email })
    return res.status(200).json(new ApiResponse(200, updatedUser, "User updated successfully"))
  }
  if (lastName && email) {
    if (!isEmailValid.success) {
      return res.status(403).json(new ApiResponse(403, {}, "Please send valid email format"))
    }
    const updatedUser = await updateDetails({ lastName, email })
    return res.status(200).json(new ApiResponse(200, updatedUser, "User updated successfully"))
  }

  if (firstName) {
    const updatedUser = await updateDetails({ firstName })
    return res.status(200).json(new ApiResponse(200, updatedUser, "User updated successfully"))
  }
  if (lastName) {
    const updatedUser = await updateDetails({ lastName })
    return res.status(200).json(new ApiResponse(200, updatedUser, "User updated successfully"))
  }
  if (email) {
    if (!isEmailValid.success) {
      return res.status(403).json(new ApiResponse(403, {}, "Please send valid email format"))
    }
    const updatedUser = await updateDetails({ email })
    return res.status(200).json(new ApiResponse(200, updatedUser, "User updated successfully"))
  }
})

const searchByUsername = asyncHandler(async (req, res) => {
  const filter = req.query.filter || "";

  const usersList = await User.aggregate([{
    $match: {
      $or: [{
        firstName: filter
      }, {
        username: filter
      }]
    }
  }, {
    $project: {
      _id: 0,
      username: 1,
      email: 1,
      firstName: 1,
      lastName: 1,
      createdAt: 1
    }
  }])

  if (!usersList) {
    return res.status(404).json(new ApiResponse(404, {}, "User with provide username or firstName is not found"))
  }

  return res.status(200).json(new ApiResponse(200, usersList, "Users found"))

})


export { signUp, signIn, updateContent, searchByUsername };
