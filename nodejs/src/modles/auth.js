import mongoose from "mongoose";
const authSchames = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: "member",
    },


})

export default mongoose.model('Auth', authSchames)