import mongoose from "mongoose";
const orderSchema= new mongoose.Schema({

    products:{
        type:[{
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                req:true,
                ref:"Product"

            },
            count:Number,
            price:Number
        }],
        reuired:true

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
   address:{
        type:String,
        required:true
    },
   amount:{
        type:Number,
        required:true
    },
    coupon:String,
    transactionId:String,
    status:{
        type:String,
        enum:["ORDERED","SHIPPED","DELIVERED","CANCELLED"],
        default:ORDERED

        //WE CAN IMPROVE THIS LATER 
    },
    //PAYMENT MODE



}
,
{
    timestamps:true
}

)

export default mongoose.model("Order", orderSchema);