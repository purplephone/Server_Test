
checkProSub = function(req,res){
  if(!req.body.pro || !req.body.sub)return false;
  else return true;

}

module.exports = {
  checkSession : function(req,res){
    sess = req.session;
    if(!sess.idd)return false;
    else return true;
  },

  checkBlank : function(req,res){

    if(!req.session.idd || !req.body.title ||!req.body.pass || !req.body.write)return false;
    else {
      if(!req.body.type){
      return checkProSub(req,res);
    }
      return true;
    }
  },

  checkLE : function(req,cw){
    if(cw.length==0)
    cw[0]={
      pro:req.query.pro,
      sub:req.query.sub,
      title:"",
      write:""
    }
    else {

      if(!cw[0].pro){
        cw=[];
        cw[0]={
          pro:"",
          sub:"",
          title:"",
          write:""
        }
      }
    }
    return cw
  }

}
