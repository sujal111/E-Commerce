import Product from '../models/product.scema.js'
import formidable  from 'formidable';
import fs from "fs"
import {deleteFile,s3FileUpload} from "../services/imageUploader.js"

import { Mongoose  } from 'mongoose';
import asyncHandler from '../services/asyncHandler'
import CustomError from '..utils/ustomError'





export const addProduct=asyncHandler(async(req,res)=>{
    const form=formidable({
        multiples:true,
        keepExtensions:true

    });
    form.parse(req,async function(err,fiels,files){
        try{
            if(err){
                throw new CustomError(err.message || "Something went wrong",500)
            }

            //handling  images
            let imgArrayResp=Promise.all(
                Object.keys(files)
            )
        }catch(error){

        }
    })
})