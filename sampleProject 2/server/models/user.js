'use strict';
var mongoose = require('mongoose');
mongoose.connect( 'mongodb://localhost:27017/sampleproject' );

var Schema = mongoose.Schema;

// set up a mongoose model

var userdata=mongoose.model('userrecord', new Schema({
    fname: String,
    lname: String,
    dob: Date,
    hobby:Array,
    comments:String,
    image : Buffer,
    contenttype:String


}));

module.exports =userdata;

