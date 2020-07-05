
const fs = require('fs');
const lycan = require('lycan-db');
let models = {};
fs.readdirSync('./server/models').forEach((file => {
  let model = require('../models/' + file).model;
  models[model.group] = model;
}))
lycan.local('../db', models);


module.exports = { 
    index: function (req, res){ 
		res.render('index'); 
    }, 
}  
