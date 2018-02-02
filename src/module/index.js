var fs = require('fs');
module.exports = {
  getTodayLog(filePath){
    return new Promise( (resolve, reject )=>{
      fs.readFile(filePath , 'utf-8' , function (err, content) {
        if (err){
          console.log(err);
          reject(err);
          return;
        }
        
        content = '['+content.toString('utf-8').replace(/ \n /g, ',')+']';
        resolve(content);
      })
    })

  }
}