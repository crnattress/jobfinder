var express = require('express');
var jobModel = require('./models/Job');
var jobsData = require('./jobs-data.js');
var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function (req, res) {
    jobsData.findJobs().then(function(collection) {
       res.send(collection); 
    });
});

app.get('*', function(req, res) {
   res.render('index'); 
});

jobsData.connectDB('mongodb://appuser:Password1@ds039421.mongolab.com:39421/jobfinder-01')
        .then(function() {
           console.log('connected to mongodb successfully');
           jobsData.seedJobs();
        });

app.listen(process.env.PORT, process.env.IP);
