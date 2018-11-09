
var mongoose = require("mongoose");

var DunCardItem = mongoose.Schema({
  itemId:{type:String},
  itemName:{type:String},
  itemRarity:{type:String},
  itemType:{type:String},
  itemTypeDetail:{type:String},
  itemAvailableLevel:{type:String},
  itemObtainInfo:{type:String},
  itemExplain:{type:String},
  itemExplainDetail:{type:String},
  itemFlavorText:{type:String},
  setItemId:{type:String},
  setItemName:{type:String},
  cardInfo:{
    slots:[{
      slotId:{type:String},
      slotName:{type:String}
    }],
    enchant:[{
      status:[{
        name:{type:String},
        value:{type:String}
      }],
      upgrade:{type:Number}
    }]
  }
});

var DunCardItem = mongoose.model("DunCardItem", DunCardItem);
module.exports = DunCardItem;
