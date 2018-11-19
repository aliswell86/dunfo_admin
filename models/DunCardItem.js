
var mongoose = require("mongoose");

var DunCardItem = mongoose.Schema({
  itemSeq:{type:Number},
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
  searchItemName:{type:String},
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
      upgrade:{type:Number},
      reinforceSkill:[{
        jobId:{type:String},
        jobName:{type:String},
        skills:[{
          name:{type:String},
          value:{type:Number}
        }]
      }]
    }]
  }
});

var DunCardItem = mongoose.model("DunCardItem", DunCardItem);
module.exports = DunCardItem;
