'use strict';
var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var userdata   = require('../models/user'); // get our mongoose model
//require('request-debug')(request);
var mongoose = require('mongoose');

router.get('/*', function(req, res) {
    res.sendfile('./client/index.html');
});

//Login Request
router.post('/apitest', function(req, res, next) {
   // res.send(req.body.user);
    var data=req.body;

    var user_data = new userdata({
        fname: data.fname,
        lname: data.lname,
        dob: data.dob,
        hobby:data.hobby,
        comments:data.comments,
        image : data.imageSrc,
        contenttype:"IMGSRC"

    });
    user_data.save(function (err, data) {
        if (err){
            console.log(err);
            res.json(error);
        }
        else {
        //    console.log('Saved : ', data );
          //  res.json(data);

            userdata.find({},function(error, data){
                if(error){
                    console.log(error);
                    res.json(error);

                }
                else{
                    res.json(data);
                }
            });
        }
    });
    userdata.find({},function(error, data){
        if(error){
            console.log(error);
        }
        else{
            console.log(data);
        }
    });


});

module.exports = router;
