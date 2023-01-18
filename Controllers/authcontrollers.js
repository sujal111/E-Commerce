import User from '../models/user.schema.js'
import asyncHandler from '../services/asyncHandler'
import CustomError from '../utils/customError'


export const cookieOptions={
    expires: new Date(Date.now()+3*24*60*60),
    httpOnly:true,
//Could be in a separate files in utils 

}

/* 
@SIGNUP
@route http://localhost:4000/api/auth/signup
@description User signup controller for creating a new user
@parameters name,email,password
@returns User Object 
*/

export const SignUp=asyncHandler(async(req,res)=>{
   const {name,email,password} = req.body
   if(!name || !email || !password){
       throw new CustomError('Please fill all the fields ',400)
   }
   //check if user exists 
   const existingUser = await User.findOne({email})

   if(existingUser){
    throw new CustomError('User already exists',400)

   }

   const user= await User.create({
       name,
       email,
       password
   });

   const token= user.getJWtToken() 
   console.log(user)
   user.password=undefined

   res.cookie("token", token,cookieOptions)

   res.status(200).json({
       success:true,
       token,
       user
   })




})


/* 
@LOGIN
@route http://localhost:4000/api/auth/signup
@description User signup controller for creating a new user
@parameters name,email,password
@returns User Object 
*/


export const login=asyncHandler(async(req,res)=>{
    const {email,password} = req.body
   if(!email || !password){
       throw new CustomError('Please fill all the fields ',400)
   }

   User.findOne({email}).select("+password")
   if(!user){
       throw new CustomError('Invalid Credentials',400)
   }

   const isPasswordMatched= await user.comparePassword(password)

   if(isPasswordMatched){
const token = user.getJWtToken()
user.password=undefined;
res.cookie("token",token,cookieOptions)
return res.status(200).json({
    success:true,
    token,
    user 
})
   }

    throw new CustomError('Invalid Credentials-pass ',400)
})

/*@LOGOUT
@route http://localhost:4000/api/auth/logout
@description :User logout by clearing user cookies
@parameters 
@returns success message
*/

export const logout=asyncHandler(async(req,res)=>{
    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly:true

    })

    res.status(200).json({
        success:true,
        message:"logged Out "
    })
})





