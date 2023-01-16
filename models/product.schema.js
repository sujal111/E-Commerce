import mongoose  from "mongoose";


const productSchema= new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"Please provide a product name"],
        maxLength:[120,"Product name should not be more than 120 characters"]

    },
    prices:{
        type:Number,
       
        required:[true,"Please provide a product name"],
        maxLength:[5,"Product price should not be more than 5 digits"]

    },

    description:{
        type:String,
        //use some form of editoe
       

    },
    photos: [
        {
            secure_url:{
                type:String,
                required:true
            }
        }
    ],
    stock:{
        type:Number,
        default:0
    },
    sold:{
        type:Number,
        default:0
    },
    collectionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Collection"
    }
       
   






},
{
    timestamps:true
}

)

export default mongoose.model("Product",productSchema);