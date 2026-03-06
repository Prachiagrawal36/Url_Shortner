import express from "express";
import{shortenPostRequestBodySchema} from "../validation/request.validation.js"
import {db} from "../db/index.js"
import {urlsTable} from "../models/index.js"
import { nanoid } from "nanoid";
import {ensureAuthenticated} from "../middlewares/auth.middleware.js"
import {and,eq} from "drizzle-orm"

const router = express.Router();


router.post("/shorten",ensureAuthenticated,async(req,res)=>{
    // const userId = req.user?.id
    
    // if(!userId) return res.status(401).json({error: "You are not logged in..."})

    const validationResult = await shortenPostRequestBodySchema.safeParseAsync(req.body);

    if(validationResult.error)
        return res.status(400).json({error: validationResult.error.message})

    const {url,code} = validationResult.data;
    const shortCode= code ?? nanoid(6);
    const [result] = await db.insert(urlsTable).values({
        shortCode,
        targetUrl: url, 
        userId: req.user.id
    }).returning({
        id: urlsTable.id,
        shortCode: urlsTable.shortCode,
        targetUrl: urlsTable.targetUrl
    });
 return res.status(200).json({ id: result.id, shortCode: result.shortCode , targetUrl: result.targetUrl})
});

router.get("/codes", ensureAuthenticated,async (req,res)=> {
    const codes = await db.select()
    .from(urlsTable)
    .where(eq(urlsTable.userId, req.user.id))

    return res.json({codes}) 
})

router.delete("/:id",ensureAuthenticated,async(req,res)=>{
const id = req.params.id;
await db 
.delete(urlsTable)
.where(and(eq(urlsTable.id,id), eq(urlsTable.userId, req.user.id)));
return res.status(200).json({deleted: true})
})

router.get("/:shortCode", async(req,res)=>{
    const code = req.params.shortCode;
    const [result] = await db
    .select({
        targetUrl: urlsTable.targetUrl
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, code))

    if(!result){
        return res.status(404).json({error: "Short code not found..."}) 
    }
    return res.redirect(result.targetUrl)
})


export default router;

