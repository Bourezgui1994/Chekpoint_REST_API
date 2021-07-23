console.clear()
// require express
const express = require('express')

// require mongoose 
const mongoose =require ('mongoose')

// require the db

const connectDB = require ('./connect')

// init app
const app = express ();

// create the port
const PORT = 5000;

//connect the db
const User = require ('./Models/user')
connectDB();

//app level middleware
app.use(express.json())

//listen to the port
app.listen(PORT, err => err? console.log(err): console.log(`App listening on port ${PORT} `))

app.get("/", (req, res) => {
    res.status(200).send ("hello world ") });

app.get("/users", (req, res) => {
    User.find({}, (err, data) => {
        if (err) console.log(err);
        else res.status(200).json(data);
    });
    });

app.post("/users/add", (req, res) => {
    const { name, age, occupation } = req.body;
    const newUser = new User({
        name,
        age,
        occupation,
    });
    newUser.save();
    res.send(newUser);
    });
    
app.put("/users/edit/:id", async (req, res) => {
let toEdit = req.params.id;
let { name, age, occupation } = req.body;
try {
    await User.findOneAndUpdate(
    { _id: toEdit },
    { $set: { name, age, occupation } }
    );
    res.status(200).send(`user ${toEdit}  updated`);
} catch (error) {
    console.log(error);
}
});

app.delete("/users/delete/:id", async (req, res) => {
let toDelete = req.params.id;
try {
    await User.findOneAndDelete({ _id: toDelete });
    res.status(200).end(`user ${toDelete} Deleted`);
} catch (error) {
    console.log(error);
}
});