//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect("mongodb://localhost:27017/userDB")

const userSchema = {
    email: String,
    password: String
};
const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.render("home")
})
app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.post("/register", (req, res) => {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save((err) => {
        if (!err) {
            res.render('secrets')
        }
    })
})

app.post('/login',  (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}, (err, founder)=>{
        if(!err){
            if(founder) {
                console.log(founder.password);
                console.log(password);
                if(founder.password === password.toString()) {
                    res.render('secrets')
                }else{
                    console.log("wrog password");
                }
            }else{
                console.log("no user mach!");
            }
        }
    })
})
app.listen(3000, () => {
    console.log("server: 3000 working");
})