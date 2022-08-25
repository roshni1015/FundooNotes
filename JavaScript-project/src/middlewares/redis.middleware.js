import { client } from "../config/redisdatabase";
import HttpStatus from 'http-status-codes'

export const redis_Notes = async(req, res, next) => {
    const result = await client.get('AddNote');

    if(result){
        const data = JSON.parse(result)
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:data,
            message:"Fetched Notes Successfully"
        })
    }else{
        next();
    }
};