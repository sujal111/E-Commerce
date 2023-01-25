import Product from '../models/product.scema.js'
import formidable  from 'formidable';
import fs from "fs"
import {deleteFile,s3FileUpload} from "../services/imageUploader.js"

import { Mongoose  } from 'mongoose';
import asyncHandler from '../services/asyncHandler'
import CustomError from '..utils/ustomError'
import config from "../config/index.js"
import { maxFieldsExceeded } from 'formidable/FormidableError';




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
                Object.keys(files).map(async(filekey,index)=>{
                    const element=files[filekey]
                  const data=  fs.readFileSync(element.filepath)
                  const upload=await s3FileUpload({
                      bucketName:config.S3_BUCKET_NAME,
                      key:`products/${productId}/photo_${index+1}.png`,
                      body:data,
                      contentType:element.mimetype

                  })
                  return {
                      secure_url:upload.Location
                  }
                })
            )

            let imgArray=await  imgArrayResp;
            const product=await Product.create({
                _id:productId,
                photos:imgArray,
                ...maxFieldsExceeded,
            })
        }catch(error){

        }
    })
})