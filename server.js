const express = require("express");
const db = require("./db/db.json");
const path = require("path");
const fs = require("fs");
const ntid = require("./public/assets/js/helper")

const app = express();
const PORT = 3001;


app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use(express.static("public"));

app.get("/", (req,res) => res.sendFile(path.join(__dirname, "public/index.html")))

app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

app.get("/api/notes", (req,res) =>{ 
    res.json(db)
});

app.post("/api/notes", (req,res) => {
   const {title, text} = req.body;
    const newNote = {
        title,
        text,
        id: ntid()
    };
    db.push(newNote);
    const noteString = JSON.stringify(db);
    fs.writeFile('./db/db.json', noteString, (err) => 
    err
        ? console.error(err)
        : console.log('new Note was written to JSON file')
    );
    res.json(db)
});

app.delete("/api/notes", (req,res) => res.json(db))
// struggling to find a solution here

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
})
