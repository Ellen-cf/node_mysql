const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()
//definindo handlebars como template
app.engine("handlebars",exphbs.engine())
app.set("view engine", "handlebars")

//pasta de arquivos estáticos cp,p css, imagens
app.use(express.static("public"))

//trabaçhar com dados no formato json
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

//rotas
app.get("/",(req,res)=>{
    res.render("home")
})

//conectar com o mysql
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"root",
    dataase: "nodemysql",
    port:3307
})

conn.connect((error)=>{
    if(error){
        console.log(error)
        return
    }

    console.log("Conectado ao MySQL!")

    app.listen(300,()=>{
        console.log("Servidor rodando na porta 300")
    })
})