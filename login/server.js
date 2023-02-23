class Database {
    constructor(config){
        this.connection = config
    }

    connect(){
        this.connection.connect((err) => {
            if(err) throw err;
            console.log("Connected to Databases!");
        })
    }

    query(app){
        app.get("/", (req, res) => {
        const sql = "SELECT * FROM users"
        this.connection.query(sql, (err, result) => {
            const users = JSON.parse(JSON.stringify(result))
            res.render("register", {users: users, title: "TEST"})
         })
        })
        app.get("/login", (req, res) => {
        const sql = "SELECT * FROM users"
        this.connection.query(sql, (err, result) => {
            const users = JSON.parse(JSON.stringify(result))
            res.render("login", {users: users, title: "TEST"})
         })
        })
    }

}

class Auth{
    constructor(database){
        this.db = database
    }

    register(app){
        app.post('/register', async (req, res) => { 
            const {email, password} = req.body
            let saltRounds = await bcrypt.genSalt(10);
            const hashedPassword =  bcrypt.hashSync(password, saltRounds);
            const insert = `INSERT INTO users (email, password) VALUES ('${email}', '${hashedPassword}')` 
            // const values = [email, hashedPassword]
            console.log(insert);
            this.db.query(insert, (err, result) => {
                if (err) {  
                    console.log(err);
                }
                res.redirect("/")
                // res.send("Berhasil")
                })
            })      
    }

    login(app){
    app.post('/login', (req, res) => {
        const {email, password} = req.body
        const user = `SELECT * FROM users WHERE email = '${email}'`
        if (!user) {
            res.send("WRONG Email")
            return
        }
        const isValid = bcrypt.compare(password, user.password)
        if (!isValid) {
            res.send("WRONG Pass")
            return
        }
        res.send("ok")

    })
    }
}

const mysql = require("mysql")
const express = require("express")
const BodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const session = require('express-session')

const app = express();

// Configurasi Sessions
app.use(session({
    secret : 'webslesson',
    resave : true,
    saveUninitialized : true
  }));

// Format Standart untuk menerima form inpput
app.use(BodyParser.urlencoded({extended: true}))
// Declarasi View engine menggunakan Ejs
app.set("view engine", "ejs")

// Template Engine Directory
app.set("views", "views")

// untuk Configurasi/Inisialisi
const db = mysql.createConnection({
    host: "localhost",
    database: "test_login",
    user: "root",
    password:""
    
})

// 
const database = new Database(db)
database.connect()
database.query(app)


// Auth
const auth = new Auth(db)

// register
auth.register(app)
// auth.login(app)


app.listen(8000, () => {
    console.log("ready");
})
