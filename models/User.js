import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    email:{
        type: String,
        unique: [true, "Email already exits"],
        required: [true, "Email is required"]
    },
    username: {
        type:String,  
    },
    image: {
        type: String
    }


},{
timestamp:true, 
}
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;