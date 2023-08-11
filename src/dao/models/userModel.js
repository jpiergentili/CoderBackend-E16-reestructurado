import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    role: String
});

class UserModel {
    static get model() {
        return mongoose.model('User', userSchema);
    }

    static get schema() {
        return userSchema;
    }
}

export default UserModel;