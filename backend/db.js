import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/paytm")
    .then((res) => {
        console.log("DB is connected.")
    })
    .catch((err) => {
        console.error(err);
    })

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.model("User", UserSchema);

export {User};