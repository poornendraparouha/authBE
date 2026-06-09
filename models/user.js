import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "first name is reqired"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "first name is reqired"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "pasword is required"],
        minlength: 8,
        match: [
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, 1 uppercase letter, 1 number, and 1 special character",
        ],
    },
}, {timestamps: true,})

export default mongoose.model("User", userSchema);