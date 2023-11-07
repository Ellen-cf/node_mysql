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

app.post("/cadastrar/save", (request, response) =>{
     //todas as informacoes de formulario ela vem de request.body
    //desestruturação, evita de fazer duas variaveis, é como se eu tirasse do body as duas propriedades,  que e o title e o pageqty
    //mandar para o banco de dados
    const {title,pageqty } = request.body
    
    //criando a query
    const query = `
        INSERT INTO books (title,pageqty)
        VALUES('${title}', '${pageqty}')
    `

    conn.query(query, (error)=>{
        if (error){
            console.log(error)
            return
        }
        response.redirect("/")
    })
})

app.get("/book/:id", (req, res)=>{
    const id = req.params.id
//query
    const sql = `
        SELECT * FROM books
        WHERE id=${id}
    `

    conn.query(sql, (error, data) =>{
        if (error){
            return console.log(error)//return p para a função
        }
        const book = data[0]//array na posição 0, deverá ter apenas 1 livro no mesmo id
        res.render("book", { book })
    })
})


app.get("/cadastrar", (request,response) =>{
    response.render("cadastrar")
})
//rota para pagina de cadastrar



app.get("/", (req,res)=>{
    const sql = 'SELECT * FROM books'
     //variavel de query para busca de banco de dados, pode vir um erro ou os dados
    conn.query(sql, (error, data) => {
        if (error){
            return console.log(error)
        }
        const books = data
        //vamos renderizar a home já aqui e mandar os books, livros cadastrados pra home
        res.render("home", { books })
    })

    
}) //vou precisar ir na pagina home para tratar como receber os dados

//conectar com o mysql
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"root",
    database: "nodemysql",
    port:3307
})

conn.connect((error)=>{
    if(error){
        console.log(error)
        return
    }

    console.log("Conectado ao MySQL!")

    app.listen(3000,()=>{
        console.log("Servidor rodando na porta 3000")
    })
})