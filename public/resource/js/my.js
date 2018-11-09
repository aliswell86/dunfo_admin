card = function() {

  var callback_getApiCardInfo = function(data,textStatus,xhr) {
    if(!myajax.ajaxStatus(xhr,textStatus)) return;

  };

  var callback_getDbCardInfo = function(data,textStatus,xhr) {
    if(!myajax.ajaxStatus(xhr,textStatus)) return;
    console.log(data);
  };

  return {
    getApiCardInfo : function() {
      var url = "/admin/gcitem";
      var data = {};
      data.inItemNm = $("#inCardNm").val();
      myajax.ajaxSubmit(url,data,callback_getApiCardInfo);
    },

    getDbCardInfo : function() {
      var url = "/admin/gcdbitem";
      var data = {};
      myajax.ajaxSubmit(url,data,callback_getDbCardInfo);
    }
  };
}();
