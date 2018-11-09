
var express = require("express");
var request = require("request");
var qs = require("querystring");
var DunCardItem = require("../models/DunCardItem.js");
var router = express.Router();
var header_txt = "관리자 - 던포";
var header_description = "던포 - Dungeon&Fighter Info";
var cardItemIdList = [];
var cardItemDtlList = [];
var console_num = 1;

router.get("/", function(req, res) {
  res.render("admin/admin",{title:header_txt,description:header_description});
});

router.post("/gcitem", function(req, res) {
  cardItemIdList = [];
  cardItemDtlList = [];
  console_num = 1;
  var x = 0;
  var inItemNm = req.body.inItemNm;
  var inItemNmAry = inItemNm.split("\n");

  for(var i=0;i<inItemNmAry.length;i++) {
    setTimeout(getApiList,x,inItemNmAry[i]);
    x+=150;
  }
  // console.log("X : " + Number(x+150));
  setTimeout(getApiListProc,x+150,cardItemIdList,res);
});

router.post("/gcdbitem", function(req, res) {
  var inList = [];
  inList.push({"cardInfo.slots":{"$elemMatch":{"slotName":"머리어"}}});
  inList.push({"cardInfo.enchant":{"$elemMatch":{"status":{"$elemMatch":{"name":"마법 크리티컬 히트"}}}}});

  DunCardItem.find({$and:inList}).exec(
    function(err, dbList){
      if(err) return res.json(err);
      res.json(dbList);
    }
  );
});

module.exports = router;

var getApiList = function(inItemNm) {
  console.log(console_num + " : " + inItemNm);
  console_num ++;
  var result = "";
  var options = {
    url:"https://api.neople.co.kr/df/items?apikey=vZmjeyzzdCx4opNjt4gus3jVE8uTC6Dq&itemName="+qs.escape(inItemNm)
  };

  request(options, function(err,res,html) {
    result = html;
  }).on('complete', function() {
    var resultItem = JSON.parse(result).rows;
    for(var i=0;i<resultItem.length;i++) {
      cardItemIdList.push(resultItem[i].itemId);
    }
  });
};

var getApiListProc = function(cardItemIdList,res) {
  var y = 0;
  console_num = 1;
  for(var i=0;i<cardItemIdList.length;i++) {
    setTimeout(getApiDtlList,y,cardItemIdList[i]);
    y+=150;
  }
  // console.log("Y : " + Number(y+150));
  setTimeout(setMydbApiListDtl,y+150,res);
};

var getApiDtlList = function(id) {
  console.log(console_num + " : " + id);
  console_num++;
  var result = "";
  var options = {
    url:"https://api.neople.co.kr/df/items/"+id+"?apikey=vZmjeyzzdCx4opNjt4gus3jVE8uTC6Dq"
  };

  request(options, function(err,res,html) {
    result = html;
    console.log(JSON.parse(result).cardInfo.enchant[0].status[0].name);
  }).on('complete', function() {
    cardItemDtlList.push(JSON.parse(result));
  });
};

var setMydbApiListDtl = function(res) {
  DunCardItem.create(cardItemDtlList);
  res.json([]);
};
