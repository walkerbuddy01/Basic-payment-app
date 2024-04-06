import mongoose, { Schema, model } from "mongoose";

const balanceSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        default: 0,
        required: true
    }
}, { timestamps: true })

const Balance = model("Balance", balanceSchema);
export default Balance;