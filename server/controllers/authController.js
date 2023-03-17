const jwt = require("jsonwebtoken")
const { expressjwt: expressjwt } = require("express-jwt")

exports.login=(req,res)=>{
    //ข้อมูลเข้าสู่ระบบ
    const {username,password} = req.body
    if(password === process.env.PASSWORD){
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.json({token,username})
    }
    else{
        return res.status(400).json({error:"รหัสผ่านไม่ถูกต้อง"})
    }
   
}

//ใช้ตรวจสอบ token เพื่อใช้ ฟังก์ชันต่างๆ
exports.requireLogin = expressjwt({
    secret : process.env.JWT_SECRET,
    algorithms: ["HS256"], //มีหลายตัวให้เลือกใช้
    userProperty : "auth"
})