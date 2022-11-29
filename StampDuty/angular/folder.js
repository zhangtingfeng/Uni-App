const glob = require('glob');
const val = require('path');
let value = [];

var getDirectories = function (src, callback) {
    glob(src + '/**/*', callback);
  };
  let result = getDirectories('template', function (err, res) {
    if (err) {
      console.log('Error', err);
    } else {
      // val = val.dirname(res);
      let dir = [];
      res.forEach(element => {
        console.log(element);
        
        dir.push(val.dirname(element));
        // console.log(val1);
        //val1 = val1.filter((a, b) => array.indexOf(a) === b);
        //console.log(val1);
      });
      // console.log(dir);
      //svar val1 = dir.filter((a, b) => array.indexOf(a) === b);
       value = Array.from(new Set(dir));
      
      //console.log(res);
    }
    console.log(value);
  });