const express = require('express');
const cookieParser = require('cookie-parser');
const PORT = 8100;

const app = express();
const student = express.Router();

app.use(express.json());
app.use(cookieParser());
app.use("/student" , student);

let name , age , grade;

student.post("/login" , (req , res , next) =>{
    const {name} = req.body;

    res.cookie("name" , `${name}`);

    res.send(`<h1>Login to your account</h1> <p>Welcome ${name}</p>`);
    console.log("Login to your account");

});


student.get("/register" , (req , res , next) =>{
    res.send(`<h1>Register your account</h1> <p>Click to register account</p>`);
    console.log("Register Account");
});

student.get("/dashboard" , (req , res , next) =>{
    const {name} = req.cookies;

    if(name){
        res.send(`DashBoard for ${name}`);
    }
    else{
        res.send("Login First");
    }
   
    console.log("Student Dashboard visited by "+ name);
});

student.post("/submit" , (req , res , next) =>{
    ({name, age , grade} = req.body);
    res.send(`<h1>Data Submitted</h1> <p>Name: ${name}, Age: ${age}, Grade: ${grade}</p>`);
    console.log("Submit Data");
});

student.get("/info" , (req , res , next) =>{
    res.send(`<h1>Welcome to the info Panel</h1> 
        <p>Check your details here</p>
        <p>Name: ${name}</p>
        <p>Age: ${age}</p>
        <p>Grade: ${grade}</p>`);
    console.log("Info Dashboard");
});

student.get("/logout" , (req , res , next) =>{
    const {name} = req.cookies;
    res.clearCookie(name);
    res.send(`<h1>Logout Your account</h1> <p>ThankYou for visiting our site</p>`);
    console.log("Logout Dashboard");
});

app.listen(PORT , () =>{
    console.log("Server is running on Port: " + PORT);
})