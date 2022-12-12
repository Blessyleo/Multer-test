const express = require('express');
const cors = require('cors');
const logger = require('morgan'); //for seeing api calls in terminal
const PORT = process.env.PORT || 3000;
const app = new express();
const multer = require("multer")
const path = require('path');

require('./middleware/MongoDB');


app.use(cors()); //to connect backend and frontend without disturbance
app.use(express.json()); //to receive data from front end
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'));

// app.use('/uploads', express.static(path.join(__dirname +'/uploads')));
// const api = require('./routes/api');
// app.use(api);
app.use(express.static(path.join(__dirname + '/dist/frontend')));



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage });

const StudentDATA = require('./models/students');

app.post('/api/studententry', upload.single('file'), async (req, res) => {


    let data = {
        name: req.body.name,
        rollno: req.body.rollno,
        address: req.body.address,
        college: req.body.college,
        fileuploadname: req.file.filename,
        fileuploadpath: req.file.path
    }
    console.log(data)

    const student = new StudentDATA(data);
    await student.save((error, dbdata) => {
        if (error) {
            res.json({ "status": "error" })
        }
        else {
            console.log(dbdata);
            res.json({ "status": "success", "data": dbdata })
        }
    });

})

app.post('/api/studentviewall', (req, res) => {
    StudentDATA.find((error, data) => {
        if (error) {
            res.json({ "status": "error" })
        }
        else {
            res.json(data);
        }
    });
});


app.post('/api/studentupdate', async (req, res) => {
    let data = req.body;
    await StudentDATA.findOneAndUpdate({ "_id": req.body._id }, data)

    res.json({ "status": "success" });
})


app.post('/api/studentsearch', (req, res) => {
    StudentDATA.find({ "rollno": req.body.rollno },
        (error, data) => {
            if (error) {
                res.json({ "status": "error" })
            }
            else {
                res.json(data);
                console.log(data);
            }
        });
})
app.post('/api/studentdelete', (req, res) => {
    res.send("testing delete");
})

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
});


app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})