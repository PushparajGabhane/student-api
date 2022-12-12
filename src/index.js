const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const studentArray = require('./InitialData');

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here

app.get("/", (req, res) => {
    res.status(200);
    res.end("Server Started");
});

app.get("/api/student", (req, res) => {
    try {
        res.json(studentArray);
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        });
    }
});

app.get("/api/student/:id", (req, res) => {
    const id = req.params.id;
    let i;
    for (i = 0; i < studentArray.length; i++) {
        if (id == studentArray[i].id) {
            res.json({
                status: "Success",
                data: studentArray[i]
            });
            res.end();
        }
    };
    if (i == studentArray.length) {
        res.status(400).json({
            status: "Failed",
            message: "Id not exists"
        });
        res.end();
    };
});

app.get("/*", (req, res) => {
    res.status(404);
    res.end("Page Not Found");
})

let _id = studentArray.length + 1;

app.post("/api/student", (req, res) => {
    let studentData = req.body;
    try {
        res.setHeader("POST", { 'content-type': 'application/x-www-form-urlencoded' })
        studentArray.push({
            id: _id,
            name: studentData.name,
            currentClass: studentData.currentClass,
            division: studentData.division
        });
        _id = _id + 1;
        res.json({
            status: "Success",
            data: studentData
        })
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
});

app.put("/api/student/:id", (req, res) => {
    let _id = parseInt(req.params.id);
    let studentData = req.body;
    let i;
    for (i = 0; i < studentArray.length; i++) {
        if (_id == studentArray[i].id) {
            res.status(200);
            res.setHeader("PUT", { 'content-type': 'application/x-www-form-urlencoded' })
            studentArray[i] = {id:_id,...studentData};
            res.json({
                status: "Success",
                data: studentData
            });
            res.end();
        }
    };
    if (i == studentArray.length) {
        res.status(400).json({
            status: "Failed",
            message: "Id not exists"
        });
        res.end();
    };
});

app.delete("/api/student/:id", (req, res) => {
    const id = req.params.id;
    let i;
    for (i = 0; i < studentArray.length; i++) {
        if (id == studentArray[i].id) {
            res.status(200);
            studentArray.splice(i, 1);
            res.json({
                status: "Success",
            });
            res.end();
        };
    };
    if (i == studentArray.length) {
        res.status(400).json({
            status: "Failed",
            message: "Id not exists"
        });
        res.end();
    };
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;   