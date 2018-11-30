var md5 = require('md5')
var salt = "!@#$%^&*()_+azx1c@"
module.exports = {
  md : function(pass){
    return md5(pass+salt)
  }
}
