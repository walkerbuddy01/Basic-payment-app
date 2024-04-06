import JWT from "jsonwebtoken"
import ApiResponse from "../utils/apiResponse.js";
import User from "../models/user.modal.js";
import asyncHandler from "../utils/asyncHandler.js";

const JWTVerify = asyncHandler(async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken || req.headers.Authorization?.replace("Bearer ", "");

        if (!accessToken) {
            return res.status(404).json(new ApiResponse(404, {}, "Token not found "))
        }

        const decodedData = JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (!decodedData) {
            return res.status(403).json(new ApiResponse(403, {}, "Unauthorized Access"))
        }

        const user = await User.findById(decodedData._id);

        if (!user) {
            return res.status(404).json(new ApiResponse(404, {}, "user not found "))
        }

        req.user = user
        next();
    } catch (error) {
        console.log(error.message)
    }

})

export default JWTVerify;