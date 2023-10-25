const express = require("express");
const db = require("./db/db.json");
const path = require("path");
const fs = require("fs");
const util = require("util");

const app = express();
const PORT = 3001;


app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use(express.static("public"));

app.get("/", (req,res) => res.sendFile(path.join(__dirname, "public/index.html")))

app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

const writeToFile = (destination, content) => 
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`Data written to ${destination}`)
    );
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData)
        }
    });
};


app.get("/api/notes", (req,res) =>{ 
            res.json(db)
});

app.post("/api/notes", (req,res) => {
    const {title, text} = req.body;
    if(title && text) {
        const newNote = {
            title,
            text
        };
        readAndAppend(newNote, './db/db.json')
    } else {
        res.error('error in adding note')
    }

})

app.delete("/api/notes", (req,res) => res.json(db))

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
})
