import { Collection  } from '../models/collection.schema.js'
import asyncHandler from '../services/asyncHandler'
import CustomError from '../utils/customError'

/*
Create Collection
*/

export const createCollection =asyncHandler(async(req,res)=>{
    const {name}= req.body
    if(!name){
        throw new CustomError("Collection name is required",
        400)

    }


    //add this name to the database

    const collection=await Collection.create({
        name
    })

    res.status(200).json({
        success:true,
        message:"Collection created with success",
        collection
    })
})

export const updateCollection=asyncHandler(async(req,res)=>{
    //Get existing value to be updated
    const {id:collectionId}=req.params
    //New values to be updated
const {name}=req.body

if(!name){
    throw new CustomError("Collection name is required",400)

}
let  updatedCollection= await Collection.findByIdAndUpdate(
    collectionId,
    {
name,
    },
    {
        new:true,
        runValidators:true
    }
)

if(!updateCollection){
    throw new CustomError("Collection not found",400)
}

//Send response to Frontend

res.status(200).json ({
    success:true,
    message:"Collection updated succesfully",
    updateCollection
})
})

export const deleteCollection=asyncHandler(async(req,res)=>{
    const {id:collectionId}=req.params

  const collectionToDelete=  await Collection.findByIdAndDelete(collectionId)
  if(!collectiontoDelete){
    throw new CustomError("Collection not found",400)
}
collectionToDelete.remove()
res.status(200).json ({
    success:true,
    message:"Collection deleted succesfully",
    
})


})


export const getAllCollections=asyncHandler(async(req,res)=>{
   const collections= await Collection.find()
   if(!collections){
       throw new CustomError("No Collection Found",400)
   }
   res.status(200).json({
success:true,
collections
   })
})


