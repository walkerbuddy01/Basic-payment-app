import mongoose, { Schema } from 'mongoose'
import JWT from "jsonwebtoken"
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      minLength: 3,
      maxLength: 12,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
      maxLength: 15,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      maxLength: 15,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minLength: 6,
    },
    refreshToken:{
      type:String,
      default:""
    }
  },
  { timestamps: true },
)

userSchema.methods.generateRefreshToken = function () {
  const refreshToken = JWT.sign({
    _id: this._id,
  }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  })
  return refreshToken;
}
userSchema.methods.generateAccessToken = function () {
  const accessToken = JWT.sign({
    _id: this._id,
  }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  })
  return accessToken;
}
const User = mongoose.model('User', userSchema)

export default User;
