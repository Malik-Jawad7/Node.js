import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const userScheme = new Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    fullname: {
        type: String,
        required: true
    },

    tokens: {
        default: [],
        type: []
    }


});

userScheme.pre('save',function(next){
    const user=this
    //encryption
    if (user.isModified('password')) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
    
        user.password = hash
    }
    next()

})

userSchema.methods.comparePassword = function (password) {
    const user = this

    //user.password === db password (encrypted) asjdhu2i346193
    //password === frontend password (normal) 123456
    console.log('db password', user.password)
    console.log('frontend password', password)
    
    return bcrypt.compareSync(password, user.password)
}

userSchema.methods.generateToken = function() {
    const { _id } = this
    const token = jwt.sign({ _id }, jwtSecret);

    return token
}

const Users = mongoose.model('user', userScheme);

export default Users