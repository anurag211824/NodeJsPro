const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

// Hash password before saving
UserSchema.pre('save',async function (next){
    if(!this.isModified('password'))
        return next();
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);

// Schema: Defines the structure of the users collection with name, email, and password fields.

// Password Hashing: Before saving a user, it checks if the password is modified. If it is, the password is hashed using bcrypt, and then saved.

// Export Model: The model is exported so that it can be used to interact with the users collection in MongoDB.