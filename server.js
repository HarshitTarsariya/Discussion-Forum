var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');
var cors = require('cors');
var mongoose = require('mongoose');
var app = express();
var fs = require('fs');
var nodemailer = require('nodemailer');
const { Console } = require('console');
const formidable = require('formidable');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/DiscussionForum', { useNewUrlParser: true }, (err) => {

    if (err) {
        console.log('=======Can not connect to the database=======' + err);
    } else {
        console.log('=======Connection established to the database=======');
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(cors());

const port = 3000;
app.listen(port, function() {
    console.log("=======Server Started Listening=======");
});

var Users = require('./models/user');
var Questionanswers = require('./models/questionanswer');
var Adminusers = require('./models/adminuser');
const { element } = require('protractor');

app.post('/users/register',
    function(req, res) {
        console.log("=======User Adding=======");
        Users.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            confirmpassword: req.body.confirmpassword,
            email: req.body.email,
            mobile: req.body.mobile,
            follower: 0,
            following: 0,
            contribution: 0
        }, function(err) {
            if (err) {
                console.log("=======User Adding Error=======");
                res.send({ status: 0, message: "Registeration Error" });
            } else {
                console.log("=======User Added Successfully=======");
                sendMail(req.body.email);
                res.send({ status: 1, message: "Registered Successfully" });
            }
        });
    });

function sendMail(receiver, otp = -1) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Your Email',
            pass: 'Your Password'
        }
    });
    var mailOptions;
    if (otp == -1) {
        mailOptions = {
            from: 'Your Email',
            to: receiver,
            subject: 'no-reply DiscussionForum',
            html: '<img src="cid:dsforum" width="1200" height="800"/>', //img that is shown in email
            attachments: [{
                filename: 'mail.jpg',
                path: './mail1.jpg',
                cid: 'dsforum' //same cid value as in the html img src
            }]
        };
    } else {
        mailOptions = {
            from: 'Your Email',
            to: receiver,
            subject: 'no-reply DiscussionForum',
            html: '<h3>Request for changing password received<h3><h4>Otp is <b>' + otp + '</b></h4>' + '<h4>Please Donot Share with Anyone</h4><br/><h5>If you are not one who requested , contact <b>DiscussionForum@df.com</b></h5>'
        }
    }


    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
app.post('/user/checkusername',
    function(req, res) {
        console.log("=======Username Checking=======");
        Users.find({
            username: req.body.username
        }, function(err, data) {
            if (err)
                console.log(err.message);
            if (data.length > 0) {
                console.log("=======Username Already Present=======");
                res.send({ status: 0 });
            } else {
                console.log("=======Username seems unique=======");
                res.send({ status: 1 });
            }
        });
    });
app.post('/user/login',
    function(req, res) {
        console.log("=======Username Checking for Login=======");
        Users.find({
            username: req.body.username,
            password: req.body.password
        }, function(err, data) {
            if (err)
                console.log(err.message);
            if (data.length > 0) {
                console.log("=======User Successfully Logged In=======");
                res.send({ status: 1 });

            } else {
                console.log("=======User has Invalid Credentials=======");
                res.send({ status: 0 });
            }
        });
    });

app.post('/profile/upload', (req, res) => {
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function(name, file) {
        file.path = __dirname + '/src/assets/images/profile/' + file.name;
    });

    form.on('file', function(name, file) {
        console.log('Uploaded ' + file.name);
    });
});

app.post('/question/upload', (req, res) => {
    Questionanswers.create({
        asker: req.body.asker,
        time: req.body.time,
        title: req.body.title,
        question: req.body.question,
        tags: req.body.tags,
        answers: []
    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

app.post('/question/load', (req, res) => {
    Questionanswers.find({}, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    }).limit(3).skip((req.body.skipper) * 3);
})

app.post('/user/getdetails', (req, res) => {
    Users.find({ username: req.body.username }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

app.post('/user/setdetails', (req, res) => {
    Users.update({ username: req.body.username }, {
        $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mobile: req.body.mobile,
            email: req.body.email,
            password: req.body.password,
            confirmpassword: req.body.confirmpassword
        }
    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

app.post('/user/follow', (req, res) => {

    Users.update({ username: req.body.clicker }, {
        $push: {
            following: req.body.user
        }
    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            Users.update({ username: req.body.user }, {
                $push: {
                    follower: req.body.clicker
                }
            }, (err, data) => {
                if (err) {
                    res.send(err);
                } else {
                    Users.find({ username: req.body.user }, (err, data) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send(data);
                        }
                    });
                }
            });
        }
    });
});
app.post('/user/unfollow', (req, res) => {
    Users.update({ username: req.body.clicker }, {
        $pull: {
            following: req.body.user
        }
    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            Users.update({ username: req.body.user }, {
                $pull: {
                    follower: req.body.clicker
                }
            }, (err, data) => {
                if (err) {
                    res.send(err);
                } else {
                    Users.find({ username: req.body.user }, (err, data) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send(data);
                        }
                    });
                }
            });
        }
    });
});

app.post('/question/getone', (req, res) => {
    Questionanswers.find({ _id: req.body.questionid }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

app.post('/answer/upload', (req, res) => {
    Questionanswers.update({ _id: req.body.id }, {
        $push: {
            answers: {
                answerer: req.body.answerer,
                time: req.body.time,
                answer: req.body.answer
            }
        }
    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            Users.update({ username: req.body.answerer }, {
                $inc: {
                    contribution: 1
                }
            }, (err, data) => {
                Questionanswers.find({ _id: req.body.id }, (err, data) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(data);
                    }
                })
            })
        }
    })
})

app.post('/question/userspecific', (req, res) => {
    var user = req.body.username;
    var skipper = req.body.skipper;
    var assorted = []
    Questionanswers.find({ answers: { $elemMatch: { answerer: user } } }, (err, data) => {
        if (err) {
            res.send(err);
        } else {

            data.forEach(element => {
                assorted = assorted.concat({ id: element._id, title: element.title })
            });
            res.send(assorted);
        }
    }).limit(2).skip(skipper * 2)
})

app.get('/user/contribution', (req, res) => {
    var assorted = [];
    Users.aggregate([{ $sort: { contribution: -1 } }], (err, data) => {
        if (err) {
            res.send(err);
        } else {
            for (var i = 0; i < 2 && i < data.length; i++) {
                assorted = assorted.concat({ username: data[i].username, contribution: data[i].contribution });
            }
            res.send(assorted);
        }

    });
});
app.get('/question/trending', (req, res) => {
    var map = {};
    var sortable = [];
    Questionanswers.find({}, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            data.forEach(element => {
                element['tags'].forEach(element => {
                    if (element in map) {
                        map[element] += 1;
                    } else {
                        map[element] = 1;
                    }
                });
            });
            for (var times in map) {
                sortable.push([times, map[times]]);
            }
            sortable.sort((a, b) => {
                return b[1] - a[1];
            })
            var tosend = [];
            for (var i = 0; i < 8 && i < sortable.length; i++) {
                tosend = tosend.concat(sortable[i][0]);
            }
            res.send(tosend);
        }
    })
});

app.post('/user/suggestion', (req, res) => {
    var assorted = [];
    Users.find({ username: { $regex: ".*" + req.body.prefix + ".*" } }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            data.forEach(element => {
                assorted = assorted.concat(element['username']);
            });
            res.send(assorted);
        }
    })
});

app.post('/user/forgetpassword', (req, res) => {
    Users.find({ username: req.body.username }, (err, data) => {
        if (err || data.length == 0) {
            res.send({ status: 0 });
        } else {

            var receiver = data[0].email;
            console.log(receiver);
            sendMail(receiver, req.body.otp);
            res.send({ status: 1 });
        }
    })
});
app.post('/user/newpassword', (req, res) => {
    Users.update({ username: req.body.username }, {
        $set: { password: req.body.password, confirmpassword: req.body.confirmpassword }
    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});
app.post('/question/following', (req, res) => {
    var assorted = [];
    var skipper = req.body.skipper;
    Users.find({ username: req.body.username }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            data[0]['following'].forEach((element, index) => {
                Questionanswers.find({ $or: [{ asker: element }, { answers: { $elemMatch: { answerer: element } } }] },
                    (err, data1) => {
                        if (err) {
                            console.log(err);
                        }
                        assorted = assorted.concat(data1);
                        if (index == data[0]['following'].length - 1) {
                            assorted = assorted.slice(skipper * 3, skipper * 3 + 3);
                            res.send(assorted);
                        }
                    })
            });
        }
    });
});

app.post('/question/remove', (req, res) => {
    Questionanswers.remove({ _id: req.body.id }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

app.post('/user/adminlogin', (req, res) => {
    console.log("=======Username Checking for Login=======");
    Adminusers.find({
        username: req.body.username,
        password: req.body.password
    }, function(err, data) {
        if (err)
            console.log(err.message);
        if (data.length > 0) {
            console.log("=======AdminUser Successfully Logged In=======");
            res.send({ status: 1 });

        } else {
            console.log("=======AdminUser has Invalid Credentials=======");
            res.send({ status: 0 });
        }
    });
});
app.post('/question/tagsuggestion', (req, res) => {
    var assr = new Set();
    var assorted = [];
    Questionanswers.find({ tags: { $elemMatch: { $regex: ".*" + req.body.prefix + ".*" } } }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            var re = new RegExp(".*" + req.body.prefix + ".*");
            data.forEach(element => {
                element['tags'].forEach(ele => {
                    if (re.test(ele)) {
                        assr.add(ele);
                    }
                });
            });
            assr.forEach(ele => {
                assorted = assorted.concat(ele);
            })
            res.send(assorted);
        }
    })
});
app.post('/question/tag', (req, res) => {
    Questionanswers.find({ tags: { $in: [req.body.tag] } }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    }).limit(3).skip(req.body.skipper * 3);
});
