import mongoose  from "mongoose";
import AuthRoles  from "../utils/authRoles";
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
import crypto from "crypto"
import config from "../config/index"
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        maxLength:[50,"Name must be less than 50"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true

    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:[8,"Password must be atleast 8 characters"],
        select:false
    },
    role:{
        type:String,
        enum:Object.values(AuthRoles),
        default:AuthRoles
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date
},
{
    timestamps:true
}
);

//Encrypt the password
if(!this.modified("password")) return next();
userSchema.pre("save",async function(next) {
    this.password= await bcrypt.hash(this.password,10)
    next()
})

//add more features to the schema
userSchema.methods={
    //compare password
    comparePassword: async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password)
    },
//Generate JWT Token
getJwtToken:function(){
    return JWT.sign({
        _id:this._id,
        role:this.role
    },
    config.JWT_SECRET,
    {
        expiresIn: config.JWT_EXPIRY
    }
    
    )


},
generateForgotPasswordToken:function(){
    const forgotToken=crypto.randomBytes().toString('hex');
    //Save to DB
    this.forgotPasswordToken=crypto.createHash("sha256")
    .update(forgotToken)
    .digest("hex")


    this.forgotPasswordExpiry=Date.now()+20+60*1000




    //return values to the user
return forgotToken

}

}

export default mongoose.model("User", userSchema)