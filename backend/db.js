import mongoose from "mongoose";

mongoose.connect("mongodb+srv://ashutoshvishwakarma222_db_user:1DfaFnPgge4jWtch@cluster0.0utmahz.mongodb.net/?appName=Cluster0")
    .then((res) => {
        console.log("DB is connected.")
    })
    .catch((err) => {
        console.error(err);
    })

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,   //reference to user model
        ref: 'User',
        required: true
    },
    balance: { 
        type: Number,
        required: true
    }
})

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", accountSchema);

export {User, Account};