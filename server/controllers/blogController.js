//ติดต่อกับฐานข้อมูล

const slugify = require("slugify")
const Blogs = require("../models/blogs")
const {v4 : uuidv4} = require("uuid")

//บันทึก
exports.create=(req,res)=>{
    const {title,content,author} = req.body
    //ใช้ replaceAll แทนได้
    let slug = slugify(title)

    if(!slug)slug=uuidv4();

    //validate ตรวจสอบความถูกต้อง
    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหาบทความ"})
            break;
    }
    // res.json({
    //     data:{title,content,author,slug}
    // })
    // Blogs.create({title,content,author,slug},(err,blog)=>{
    //     if(err){
    //         res.status(400).json({error:err})
    //     }
    //     res.json(blog)
    // })

    //สร้าง object บันทึกข้อมูล
    Blogs.create({title:title,content:content,author:author,slug:slug})
    //ถ้าสำเร็จ
    .then(blog => {
        res.json(blog)
    })
    //ถ้ามี Error
    .catch(err =>{
        res.status(400).json({error:"มีชื่อบทความซ้ำกัน"})
    })
}

//ดึงข้อมูลทั้งหมด
exports.getallblog=(req,res)=>{
    Blogs.find({}).exec()
    .then(blogs =>{
        res.json(blogs)
    })
    .catch(err =>{
        res.json({error:"เกิดข้อผิดพลาด"})
    })
}

//ดึงบทความที่สนใจ
exports.singleblog=(req,res)=>{
    const {slug} = req.params
    Blogs.findOne({slug}).exec()
    .then(blog =>{
        res.json(blog)
    })
    .catch(err =>{
        res.json({error:"เกิดข้อผิดพลาด"})
    })
}

//ดึงข้อมูลตาม ID
exports.singleid=(req,res)=>{
    const id = req.params.id
    Blogs.findOne({_id:id}).exec()
    .then(blog =>{
        res.json(blog)
    })
    .catch(err =>{
        res.json({error:"เกิดข้อผิดพลาด"})
    })
}

exports.remove=(req,res)=>{
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec()
    .then(()=>{
        res.json({
            message:"ลบบทความสำเร็จ"
        })
    })
    .catch(err =>{
        console.log(err)
    })
}

exports.update=(req,res)=>{
    const {slug} = req.params
    // ส่งข้อมูล title , content , author
    const {title,content,author} = req.body
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec()
    .then(blog =>{
        res.json(blog)
    })
    .catch(err =>{
        console.log(err)
    })

}