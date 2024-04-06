import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import Balance from "../models/balance.model.js";
import ApiResponse from "../utils/apiResponse.js";
import User from "../models/user.modal.js";


const transferMoney = asyncHandler(async (req, res) => {
    try {
        const session = await mongoose.startSession();

        session.startTransaction();
        const { to, amount } = req.body;
        const { _id } = req.user;

        if (Number(amount) <= 0) {
            session.abortTransaction()
            return res.status(403).json(new ApiResponse(403, {}, "Invaild amount"))
        }

        const senderCurrentAmount = await Balance.findOne({ user: _id }).session(session)
        if (!senderCurrentAmount) {
            session.abortTransaction()
            return res.status(404).json(new ApiResponse(404, {}, "Sender not found"))
        }
        const isAmountVaild = senderCurrentAmount.balance >= amount ? true : false;
        if (!isAmountVaild) {
            session.abortTransaction()
            return res.status(403).json(new ApiResponse(403, {}, "not enough balance"))
        }



        const isReceiverUserExists = await User.findOne({ username: to }).session(session)
        if (!isReceiverUserExists) {
            session.abortTransaction()
            return res.status(404).json(new ApiResponse(404, {}, "receiver user not found"))
        }


        await Balance.updateOne({ user: req.user._id }, { $inc: { balance: - amount } }).session(session);

        await Balance.updateOne({ user: isReceiverUserExists._id }, { $inc: { balance: +amount } }).session(session);

        await session.commitTransaction();
        await session.endSession()

        return res.status(200).json(new ApiResponse(200, {}, "transcation successful"))


    } catch (error) {
        return res.status(400).json(new ApiResponse(400, {}, `Error:${error.message}`))
    }
})

const userBalance = asyncHandler(async (req, res) => {
    const { _id,firstName } = req.user;
    if (!_id) {
        return res.status(403).json(new ApiResponse(403, {}, "Unauthorized access"))
    }

    console.log(req.user);

    const userBalance = await Balance.findOne({ user: _id })
    if (!userBalance) {
        return res.status(404).json(new ApiResponse(404, {}, "user balance is not found"))
    }
    const {balance} = userBalance;
    return res.status(200).json(new ApiResponse(200, {
        balance,
        firstName
    }
    , "data fetched"))
})

export {
    transferMoney,
    userBalance
}
