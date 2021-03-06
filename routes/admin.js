
var express = require("express");
var request = require("request");
var qs = require("querystring");
var prettyjson = require('prettyjson');
var voca = require('voca');
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
  var x = 0;
  var inItemNm = req.body.inItemNm;
  var inItemNmAry = inItemNm.split("\n");
  cardItemIdList = [];

  for(var i=0;i<inItemNmAry.length;i++) {
    setTimeout(getApiList,x,inItemNmAry[i],i);
    x+=200;
  }

  setTimeout(getApiListProc,x+200,cardItemIdList,res);
});

router.post("/gcdtlitem", function(req, res) {
  var x = 0;
  var inItemId = req.body.inItemId;
  var inItemIdAry = inItemId.split("\n");
  cardItemDtlList = [];

  for(var i=0;i<inItemIdAry.length;i++) {
    setTimeout(getApiDtlList,x,inItemIdAry[i],i);
    x+=200;
  }

  setTimeout(getApiDtlListProc,x+200,cardItemDtlList,res);
});

router.post("/gcdbitem", function(req, res) {
  var inList = [];
  // inList.push({"cardInfo.slots":{"$elemMatch":{"slotName":"머리어깨"}}});
  // inList.push({"cardInfo.enchant":{"$elemMatch":{"status":{"$elemMatch":{"name":"마법 크리티컬 히트"}}}}});

  DunCardItem.find({}).exec(
    function(err, dbList){
      if(err) return res.json(err);
      console.log(prettyjson.render(JSON.stringify(dbList).toString()));
      res.json(dbList);
    }
  );
});

module.exports = router;

var getApiList = function(inItemNm,num) {
  var result = "";
  var options = {
    url:"https://api.neople.co.kr/df/items?apikey=vZmjeyzzdCx4opNjt4gus3jVE8uTC6Dq&itemName="+qs.escape(inItemNm)+"&wordType=front"
  };
  console.log(num + "\t" + inItemNm + "\t" + options.url);

  request(options, function(err,res,html) {
    result = html;
  }).on('complete', function() {
    var resultItem = JSON.parse(result).rows;
    for(var i=0;i<resultItem.length;i++) {
      // cardItemIdList.push(resultItem[i].itemId);
      cardItemIdList.push({"num":num,"inItemNm":inItemNm,"value":resultItem[i]});
      // console.log(console_num + " : " + inItemNm + "\n" + options.url + "\n" + resultItem[i].itemId);
      console_num ++;
    }
  });
};

var getApiListProc = function(cardItemIdList,res) {
  res.json(cardItemIdList);
};

var getApiDtlList = function(id,num) {
  var result = "";
  var options = {
    url:"https://api.neople.co.kr/df/items/"+id+"?apikey=vZmjeyzzdCx4opNjt4gus3jVE8uTC6Dq"
  };
  console.log(num + "\t" + id + "\t" + options.url);
  request(options, function(err,res,html) {
    result = html;
  }).on('complete', function() {
    // console.log(prettyjson.render(JSON.parse(result)));
    var result_obj = JSON.parse(result);
    result_obj.itemSeq = num;
    result_obj.searchItemName = voca.camelCase(result_obj.itemName);
    cardItemDtlList.push(result_obj);
  });
};

var getApiDtlListProc = function(cardItemDtlList,res) {
  DunCardItem.create(cardItemDtlList);
  res.json([]);
};

// 눈사태 라비나 카드
// 화염의 비노슈 카드
// 야시경 카겔 카드
// 긴발의 로터스 카드
// 개장수 묘진 카드
// 이사도라 카드
// 녹슨검 줄리앙 카드
// 캄페라 카드
// 숲의 마법사 카드
// 수파르나 카드
// 스토킹 플래닛 카드
// 화이트 스팀 카드
// 증오의 베일 카드
// 베키 카드
// 꼬마 건맨 콩콩이 카드
// 은광의 타고르 카드
// 아이리스 포츈싱어 카드
// 히드라클 카드
// 비트 버스티 카드
// 폭룡왕 바칼 카드
// 서큐버스 프린세스 카드
// 기동대장 슈뢰드 카드
// 아카루 카드
