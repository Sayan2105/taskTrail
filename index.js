import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

// Middleware setup
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Getting the Date
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const day = ["Sunday" , "Monday" , "Tuesday" , "Wednesday", "Thursday", "Friday", "Saturday"];
const date = new Date();
const todDate = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + " - " + day[date.getDay()];

// Task list
const todoList = []; // Initialize the array to store tasks


// Route to render the EJS template
app.get("/", (req, res) => {
    res.render("index.ejs", {
        Tdate: todDate, // Pass the date variable
        item: todoList // Pass the task list
    });
});

// Route to handle form submission
app.post("/submit", (req, res) => {
    const value = req.body["itemName"];
    todoList.push(value); // Add the task to the list
    res.redirect("/"); // Redirect back to the main page
});

//Route to handle the delete btn
app.get("/delete/:index", (req,res) =>{
    const index = req.params.index;
    if(index>=0 && index< todoList.length){
        todoList.splice(index, 1);
    }
    res.redirect("/");
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
