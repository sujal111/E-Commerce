import asyncHandler from "../services/asyncHandler";



export const generateRazorpayOrderId=asyncHandler(async(req,res)=>{
    //get product coupon from the frontend
//verify product orize from the backend
//make DB query to get all products and info
//total & final amount
//coupon check
//discount
//final Amount==total Amount-discount
const option={
    amount:Math.round(totalAmount*100),

       currency:"INR",
       receipt:`receipt_${new Date().getTime()}`

}


})