const app = require("./src/app")

app.get("/",(req,res)=>{
    res.send("oi")
})

app.listen(3000,()=>{
    console.log("porta 3000")
})