const express = require("express");
const db = require("./db/db.json")
const path = require("path");

const app = express();
const PORT = 3001;


app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use(express.static("public"));

app.get("/", (req,res) => res.sendFile(path.join(__dirname, "public/index.html")))

app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

app.get("api/notes", (req,res) => res.json(db))

app.post("/api/notes", (req,res) => {
    const newNote = req.body;
    db.push(newNote)
})

app.delete("/api/notes", (req,res) => res.json(db))

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
})
