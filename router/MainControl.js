
var controlDB = require('./ControlDB');
var dataModel = require('../models/DataModel');
var cwModel = require('../models/CwModel');
var ch = require('./filter/check')

module.exports = function(app){

  app.get('/',function(req,res){
    if(ch.checkSession(req,res))res.redirect('Main.html')
    else res.render('Login.html')

  })
  app.get('/Main.html',function(req,res){
    if(ch.checkSession(req,res)){
      controlDB.FindSc(req,res,dataModel,function(err,cw){

        tdate = String(cw[0].tdate);
        //console.log(cw[0].subname)
        res.render('Main.html',{
          dbsubname:cw[0].subname,
          dbtdate:tdate
        })
      })

    }
    else res.render('Login.html')

  })

  app.get('/Login.html',function(req,res){
    sess = req.session;
        if(sess.idd){
            req.session.destroy(function(err){
                if(err){
                    console.log(err);
                }else{
                    res.redirect('/Main.html');
                }
            })
        }else{
            res.redirect('/Main.html');
        }
  })



  app.get('/FreeC.html',function(req,res){
    controlDB.FindCW(cwModel,"CW",function(err,cw){
      if(ch.checkSession(req,res))res.render('FreeC.html',{
        cw:cw
      })
      else res.render('Login.html')
    })
  })

  app.get('/Q&AC.html',function(req,res){
    controlDB.FindCW(cwModel,"QA",function(err,cw){
      if(ch.checkSession(req,res))res.render('Q&AC.html',{
        cw:cw
      })
      else res.render('Login.html')
    })
  })


  app.get('/FreeCW.html',function(req,res){
    if(ch.checkSession(req,res))res.render('FreeCW.html',{
      cw:req.query.type
    })
    else res.render('Login.html')
  })

  app.get('/LectureReview.html',function(req,res){
    if(ch.checkSession(req,res))res.render('LectureReview.html')
    else res.render('Login.html')

  })

  app.get('/LectureEvaluation.html',function(req,res){
    controlDB.FindProSub(cwModel,req,function(err,cw){
      cw=ch.checkLE(req,cw);
    if(ch.checkSession(req,res))res.render('LectureEvaluation.html',{
      cw:cw
    })
    else res.render('Login.html')
  })
})
  app.get('/Curriculum.html',function(req,res){
    if(ch.checkSession(req,res))res.render('Curriculum.html')
    else res.render('Login.html')

  })

  app.get('/TableOption.html',function(req,res){
    if(ch.checkSession(req,res))res.render('TableOption.html')
    else res.render('Login.html')

  })
  app.get('/MTT_OPT.html',function(req,res){
    if(ch.checkSession(req,res))res.render('MTT_OPT.html')
    else res.render('Login.html')

  })


  app.post('/check',function(req,res){
    controlDB.FindDB(req,res,dataModel,function(err,data){
      if(!data)controlDB.insertDB(req,res,dataModel)
    })
    sess = req.session;
    sess.idd=req.body.id;
    res.redirect('/Main.html')
  })

  app.post('/write',function(req,res){
    console.log(req.body)
    if(ch.checkBlank(req,res)){
      controlDB.insertCW(req,res,req.body.type,cwModel)
      if(req.body.type=="CW")
      res.redirect('/FreeC.html')
      else if(req.body.type=="QA")
      res.redirect('/Q&AC.html')
      else res.redirect('/LectureEvaluation.html')
    }

    else res.send("빈칸을 채우세요.")
  })


  app.post('/makesc',function(req,res){
    if(ch.checkSession(req,res)){
      controlDB.UpdateSc(req,res,dataModel)
      console.log("완료")
    }

  })


}
