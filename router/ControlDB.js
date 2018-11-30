var time = require('../Js/Time');
var md5 = require('./filter/md5')

module.exports = {

  insertDB:function(req,res,DataModel){

    var data = new DataModel();
    data._id=req.body.id;
    data.date=time.GetToday();
    data.schedule="";

    data.save(function(err){
      if(err){
        console.error(err);
        return;
      }
      console.log(req.body.id+"학번 생성");
    })
  },

  FindDB:function(req,res,DataModel,call){
    DataModel.findOne({_id:req.body.id},function(err,data){

      call(err,data)
    })
  },
  UpdateSc:function(req,res,DataModel){
    DataModel.findById(req.session.idd,function(err,data){
      if(err)console.log(err);
      else {
        data.subname=req.body.subname;
        data.tdate=req.body.tdate;
        data.save(function(err){
          if(err)console.log(err)
        })
      }
    })
  },

  FindSc:function(req,res,DataModel,call){

    DataModel.aggregate([{
      '$match':{
        '_id':req.session.idd
      }},
      {'$project':{


               'subname':1,
               'tdate':1

            }
          }
        ],function(err,cw){

            call(err,cw);
          })
    // CWModel.find(function(err,cw){
    //   console.log(cw)
    //   call(err,cw)
    // })

  },



  insertCW:function(req,res,type,CWModel){
    var cw = new CWModel();
    cw.id=req.session.idd;
    cw.title=req.body.title;
    cw.write=req.body.write;
    cw.pass=md5.md(req.body.pass);
    cw.type=type;
    cw.sub=req.body.sub;
    cw.pro=req.body.pro;

    cw.save(function(err){
      if(err){
        console.error(err);
        return;
      }
      console.log(req.session.idd+" 글 작성");
    })

  },

  FindCW:function(CWModel,type,call){

    CWModel.aggregate([{
      '$match':{
        'type':type
      }},
      {'$project':{

              '_id':1,
               'id':1,
               'title':1,
               'write':1,
               'type':1
            }
          }
        ],function(err,cw){

            call(err,cw);
          })
    // CWModel.find(function(err,cw){
    //   console.log(cw)
    //   call(err,cw)
    // })

  },
  FindProSub:function(CWModel,req,call){

    CWModel.aggregate([{
      '$match':{
        'pro':req.query.pro,
        'sub':req.query.sub

      }},
      {'$project':{

              '_id':1,
               'title':1,
               'write':1,
               'pro':1,
               'sub':1

            }
          }
        ],function(err,cw){

            call(err,cw);
          })
    // CWModel.find(function(err,cw){
    //   console.log(cw)
    //   call(err,cw)
    // })

  }





}
