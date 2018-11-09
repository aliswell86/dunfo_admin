card = function() {

  var callback_getApiCardInfo = function(data,textStatus,xhr) {
    if(!myajax.ajaxStatus(xhr,textStatus)) return;

    var html = "";
    $.each(data, function(i, obj) {
      html += obj.itemId + "\n";
    });
    //console.log(html);
    $("#inCardNm").val(html);
  };

  var callback_getApiItemDtlInfo = function(data,textStatus,xhr) {
    if(!myajax.ajaxStatus(xhr,textStatus)) return;
    $.each(data, function(i, obj) {
      console.log("[카드."+i+"]\t"+obj.itemName);
      if(obj.cardInfo.slots !== "" && obj.cardInfo.slots !== null && obj.cardInfo.slots !== undefined) {
        $.each(obj.cardInfo.slots, function(j, slot) {
          console.log(" [슬롯."+j+"]\t"+slot.slotName);
        });
      }

      if(obj.cardInfo.enchant !== "" && obj.cardInfo.enchant !== null && obj.cardInfo.enchant !== undefined) {
        $.each(obj.cardInfo.enchant, function(k, enchant) {
          console.log(" [업글."+enchant.upgrade+"]");
          if(enchant.reinforceSkill !== "" && enchant.reinforceSkill !== null && enchant.reinforceSkill !== undefined) {
            $.each(enchant.reinforceSkill, function(kk, job) {
              console.log("  [직업."+kk+"]\t"+job.jobName);
              if(job.skills !== "" && job.skills !== null && job.skills !== undefined) {
                $.each(job.skills, function(kkk, skill) {
                  console.log("   [스킬."+kkk+"]\t"+skill.name+" +"+skill.value);
                });
              }
            });
          }else{
            $.each(enchant.status, function(jj, status) {
              console.log("  [옵션."+jj+"]\t"+status.name+"/"+status.value);
            });
          }
        });
      }

      console.log("---------------------------------");
    });
  };

  return {
    getApiCardInfo : function() {
      var url = "/admin/gcitem";
      var data = {};
      data.inItemNm = $("#inCardNm").val();
      myajax.ajaxSubmit(url,data,callback_getApiCardInfo);
    },

    getApiItemDtlInfo : function() {
      var url = "/admin/gcdtlitem";
      var data = {};
      data.inItemId = $("#inCardNm").val();
      myajax.ajaxSubmit(url,data,callback_getApiItemDtlInfo);
    }
  };
}();
